# SEO Fix Brief — gradientc.com

## Context
This is a job board aggregating AI training/data-annotation gigs (Outlier, DataAnnotation, Invisible, Surge AI, Alignerr, Mercor, etc.). Frontend is currently hosted on GitHub Pages. Diagnosis: the site appears to be a client-side-rendered SPA — fetching the raw HTML returns almost no content (just title/meta tags), and the site does not appear in Google's index at all. This is likely the primary reason for zero organic traffic.

## Goal
Make job content crawlable and indexable by Google, and set up the technical SEO foundation for ongoing ranking.

## Tasks

### 1. Diagnose current rendering
- Fetch the raw HTML of the homepage and a job listing page (curl or view-source, not browser dev tools) and confirm whether job content exists in the initial HTML response or only appears after JS executes.
- Report back which is the case before proceeding to task 2.

### 2. Fix content visibility (highest priority)
- If content is JS-rendered only: implement server-side rendering (SSR) or static pre-rendering so that job listings, titles, and descriptions exist in the raw HTML served to crawlers.
- Existing infra: backend logic runs on **Lambda (Python)**, job data is exported from an **S3 bucket**. Use this instead of migrating frameworks:
  a. Write a Python Lambda function (runtime: Python 3.12+) that reads job data from S3, renders each job into a static HTML file using **Jinja2** templates (real `<h1>` title, real paragraph description, no JS required to see content), and writes the output back to S3.
  b. Upload generated HTML files to an S3 bucket configured for static website hosting, served through **CloudFront** (CDN — fast + cheap + enables custom domain/HTTPS).
  c. Trigger regeneration whenever job data in S3 updates (S3 event → Lambda → rebuild affected pages), so listings stay current without manual rebuilds.
  d. This can fully replace GitHub Pages as your host, or GitHub Pages can stay for marketing pages while S3/CloudFront serves job pages — either works.
- Each job listing must have real `<h1>` (job title), visible paragraph text (job description), and be crawlable without requiring JS execution.

### 3. Individual indexable job pages
- Every job must have its own unique URL (e.g. `/jobs/{slug}`), not just exist inside a filtered list view.
- Each job page needs a unique `<title>` and `<meta name="description">` derived from the job's title/company/pay.

### 4. Structured data
- Add `JobPosting` schema.org markup (JSON-LD) to every individual job page. Required fields: title, description, datePosted, validThrough, employmentType, hiringOrganization, jobLocation (or applicantLocationRequirements if remote), and baseSalary if available.
- Validate using Google's Rich Results Test before shipping.

### 5. Sitemap + robots
- Generate `sitemap.xml` dynamically, listing homepage, category pages, and every individual job URL. Regenerate on each deploy/data update.
- Add `robots.txt` allowing crawlers, with a `Sitemap:` directive pointing to the sitemap URL.
- Confirm no `noindex` meta tags or robots directives are accidentally blocking pages.

### 6. Core technical hygiene
- Verify canonical tags (`<link rel="canonical">`) on each page to avoid duplicate content issues from filter/query parameters.
- Check page load speed (target: pass Core Web Vitals) — run PageSpeed Insights after SSR/pre-render fix.
- Ensure mobile responsiveness (already a design requirement).

### 7. Post-deploy verification
- Submit the site + sitemap to Google Search Console.
- Use the URL Inspection tool to request indexing on homepage and a sample of job pages.
- Confirm via `site:gradientc.com` search after a few days that pages are appearing in the index.

## Out of scope for this pass
- Referral bonus data must never appear in any public job listing, page, schema markup, or sitemap.
- Content marketing (blog posts, comparison articles) — separate follow-up task once indexing is fixed.
