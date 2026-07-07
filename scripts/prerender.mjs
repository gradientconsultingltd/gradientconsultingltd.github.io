// Prerenders every real route (home, jobs list, every individual job,
// companies list, every company, developers) to static HTML using a real
// headless browser, then overwrites the corresponding files in dist/public.
//
// Why: this is a client-rendered SPA — the raw HTML GitHub Pages serves for
// any route is just an empty <div id="root">, so nothing is crawlable by
// search engines (verified directly: `curl https://www.gradientc.com/`
// returns zero job content). This script fixes that by capturing what a
// real browser renders (after the API data loads) and saving it as the
// literal file a crawler receives for that URL — no JS execution needed
// to see real content.
//
// Also generates sitemap.xml and robots.txt from the same route list.
//
// Run after `vite build` (needs dist/public to already exist):
//   node scripts/prerender.mjs

import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import handler from "serve-handler";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "..", "dist", "public");
const API_BASE = "https://d2j34oc3q31olo.cloudfront.net";
const SITE_URL = "https://www.gradientc.com";
const PORT = 8125;
const CONCURRENCY = 8;

const COMPANIES = ["mercor", "micro1", "turing", "xai", "handshake"];

async function fetchAllJobIds() {
  const res = await fetch(`${API_BASE}/api/jobs?limit=5000`);
  const data = await res.json();
  return data.jobs.map(j => j.listing_id);
}

function startStaticServer() {
  return new Promise(resolve => {
    // Any route without a literal file yet (which, during this pass, is
    // every job/company page before we've written them) falls back to
    // index.html so the SPA loads and wouter's client-side routing takes
    // over based on the URL — this is the local equivalent of the
    // 404.html trick GitHub Pages uses, just via a proper rewrite instead
    // of a redirect, since we don't need to preserve raw request semantics
    // here the way a real host does.
    const options = { public: DIST_DIR, cleanUrls: false, rewrites: [{ source: "/**", destination: "/index.html" }] };
    const server = http.createServer((req, res) => handler(req, res, options));
    server.listen(PORT, () => resolve(server));
  });
}

// Waits for real content, not the loading skeleton — distinguishes "data
// hasn't arrived yet" from "this page is actually done rendering".
async function waitForRealContent(page, route) {
  if (route.startsWith("/jobs/") || route.startsWith("/companies/")) {
    await page.waitForSelector(".ds-backlink", { timeout: 15000 });
  } else if (route === "/jobs") {
    await page.waitForFunction(() => !document.body.innerText.includes("Loading"), { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(500);
  } else {
    await page.waitForTimeout(800);
  }
}

function outputPathFor(route) {
  if (route === "/") return path.join(DIST_DIR, "index.html");
  return path.join(DIST_DIR, route.replace(/^\//, ""), "index.html");
}

async function prerenderOnce(context, route) {
  const page = await context.newPage();
  try {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "domcontentloaded", timeout: 20000 });
    await waitForRealContent(page, route);
    const html = await page.content();
    const outPath = outputPathFor(route);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
  } finally {
    await page.close();
  }
}

// One retry after a short backoff — most failures at this scale are
// transient (a slow API response under concurrent load), not a real
// problem with that specific page.
async function prerenderRoute(context, route) {
  try {
    await prerenderOnce(context, route);
    return { route, ok: true };
  } catch (firstError) {
    await new Promise(r => setTimeout(r, 1500));
    try {
      await prerenderOnce(context, route);
      return { route, ok: true };
    } catch (e) {
      return { route, ok: false, error: String(e) };
    }
  }
}

async function prerenderAll(routes) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const results = [];
  let cursor = 0;

  async function worker() {
    while (cursor < routes.length) {
      const route = routes[cursor++];
      const result = await prerenderRoute(context, route);
      results.push(result);
      if (results.length % 50 === 0 || results.length === routes.length) {
        console.log(`[prerender] ${results.length}/${routes.length}`);
      }
      if (!result.ok) console.error(`[prerender] FAILED ${route}: ${result.error}`);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await browser.close();
  return results;
}

function writeSitemapAndRobots(routes) {
  const urls = routes.map(r => `  <url><loc>${SITE_URL}${r}</loc></url>`).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), sitemap);

  const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(DIST_DIR, "robots.txt"), robots);
  console.log(`[prerender] Wrote sitemap.xml (${routes.length} URLs) and robots.txt`);
}

async function main() {
  console.log("[prerender] Fetching job IDs from the live API...");
  let jobIds = await fetchAllJobIds();
  if (process.env.PRERENDER_LIMIT) {
    jobIds = jobIds.slice(0, Number(process.env.PRERENDER_LIMIT));
    console.log(`[prerender] TEST MODE: limited to ${jobIds.length} jobs`);
  }
  console.log(`[prerender] ${jobIds.length} jobs to prerender`);

  const routes = [
    "/", "/jobs", "/companies", "/developers",
    ...jobIds.map(id => `/jobs/${id}`),
    ...COMPANIES.map(c => `/companies/${c}`),
  ];

  const server = await startStaticServer();
  console.log(`[prerender] Static server serving ${DIST_DIR} on :${PORT}`);

  const results = await prerenderAll(routes);
  server.close();

  const failed = results.filter(r => !r.ok);
  const successRate = (results.length - failed.length) / results.length;
  console.log(`\n[prerender] Done. ${results.length - failed.length}/${results.length} succeeded (${(successRate * 100).toFixed(1)}%).`);
  if (failed.length) {
    console.error(`[prerender] ${failed.length} failed:`, failed.map(f => f.route));
  }

  // A handful of pages failing (typically transient — a slow API response
  // under concurrent load, not a real problem with that page) shouldn't
  // block the whole deploy: those specific URLs just keep working via the
  // existing client-side-only rendering (404.html fallback), same as
  // before this script existed — a partial win, not a failure. Only treat
  // this as a hard failure if something is actually broken (most pages
  // failing), which would suggest a real bug rather than normal noise.
  const MIN_ACCEPTABLE_SUCCESS_RATE = 0.7;
  if (successRate < MIN_ACCEPTABLE_SUCCESS_RATE) {
    console.error(`[prerender] Success rate ${(successRate * 100).toFixed(1)}% is below the ${MIN_ACCEPTABLE_SUCCESS_RATE * 100}% threshold — something is likely actually broken, failing the build.`);
    process.exitCode = 1;
  }

  writeSitemapAndRobots(routes);
}

main();
