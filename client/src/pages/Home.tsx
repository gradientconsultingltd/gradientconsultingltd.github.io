import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useRoute } from "wouter";
import { Streamdown } from "streamdown";

// The API lives on AWS (Lambda + API Gateway), not alongside this static
// site — GitHub Pages only serves static files, there's no server here to
// proxy /api/* to. Override with VITE_API_BASE_URL for a different
// deployment (e.g. a local Flask server while working on the API itself).
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://dt7hwc3qm0.execute-api.eu-west-2.amazonaws.com";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Job = {
  listing_id: string;
  source: "mercor" | "micro1" | "turing" | "xai" | "handshake";
  title: string;
  commitment: string;
  rate_min: number | null;
  rate_max: number | null;
  pay_rate_freq: string;
  hours_per_week: number | null;
  location: string;
  work_arrangement: string;
  eligible_location: string;
  listing_domain: string | null;
  referral_amount: number | null;
  remaining_slots: number | null;
  company_name: string | null;
  posted_at: string;
  referral_url: string | null;
  is_new: number;
  skills: string[];
  // full detail (loaded on demand)
  description?: string;
};

const PAY_UNIT: Record<string, string> = { hourly: "/hr", yearly: "/yr", monthly: "/mo" };

function payLabel(job: Job): string {
  const unit = PAY_UNIT[job.pay_rate_freq] || "/hr";
  if (job.rate_min && job.rate_max) {
    if (job.rate_min === job.rate_max) return `$${job.rate_min.toLocaleString()}${unit}`;
    return `$${job.rate_min.toLocaleString()}–${job.rate_max.toLocaleString()}${unit}`;
  }
  if (job.rate_min) return `$${job.rate_min.toLocaleString()}${unit}`;
  if (job.rate_max) return `Up to $${job.rate_max.toLocaleString()}${unit}`;
  return "Pay on listing";
}

const SOURCE_CONFIG: Record<Job["source"], { name: string; icon: string | null; fill?: boolean }> = {
  mercor: { name: "Mercor", icon: "/logo-mercor-icon.png" },
  micro1: { name: "micro1", icon: "/logo-micro1-icon.png" },
  turing: { name: "Turing", icon: "/logo-turing-icon.png" },
  xai: { name: "xAI", icon: "/logo-xai-icon.png" },
  handshake: { name: "Handshake AI", icon: "/logo-handshake-icon.png", fill: true },
};

function postedLabel(postedAt: string): string {
  if (!postedAt) return "";
  const d = new Date(postedAt);
  if (isNaN(d.getTime())) return "";
  return `Posted ${d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`;
}

const JSON_SAMPLE = `GET /api/jobs?domain=Software+Engineering&limit=20

{
  "listing_id": "list_AAABnyfFPr6RjDjB8S1K5IqV",
  "title": "ASIC/SoC Design & Verification Engineer",
  "commitment": "hourly",
  "rate_min": 70,
  "rate_max": 100,
  "location": "United States",
  "listing_domain": "Software Engineering",
  "referral_url": "https://work.mercor.com/explore?listingId=...",
  "posted_at": "2026-07-03T11:37:46"
}`;

// ─── Primitive components ──────────────────────────────────────────────────────

function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`ds-card ${className}`} style={style}>{children}</div>;
}

function Btn({ children, variant = "primary", size = "md", onClick, style, full }: {
  children: React.ReactNode; variant?: "primary" | "outline"; size?: "sm" | "md" | "lg";
  onClick?: (e: React.MouseEvent) => void; style?: React.CSSProperties; full?: boolean;
}) {
  return (
    <button className={`ds-btn ds-btn-${variant} ds-btn-${size}${full ? " ds-btn-full" : ""}`} onClick={onClick} style={style}>
      {children}
    </button>
  );
}

function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "breeze" | "money" }) {
  return <span className={`ds-badge ds-badge-${tone}`}>{children}</span>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="ds-eyebrow">{children}</div>;
}

// ─── View types ───────────────────────────────────────────────────────────────

type View = "home" | "jobs" | "detail" | "developer" | "companies" | "companyDetail";

type Company = {
  id: Job["source"];
  name: string;
  icon: string;
  summary: string;
  description: string;
  link: string;
  linkLabel: string;
};

const COMPANIES: Company[] = [
  {
    id: "mercor",
    name: "Mercor",
    icon: "/logo-mercor-icon.png",
    summary: "AI-powered hiring platform connecting vetted experts with AI labs for evaluation and human-data work.",
    description:
      "Mercor matches vetted professionals — engineers, doctors, lawyers, writers, and more — with AI labs and companies that need expert human judgment. Most roles involve interviewing, evaluating, or producing high-quality human data used to train and improve AI models.",
    link: "https://t.mercor.com/JRjyV",
    linkLabel: "Visit Mercor",
  },
  {
    id: "micro1",
    name: "micro1",
    icon: "/logo-micro1-icon.png",
    summary: "Recruiting platform matching remote professionals with contract and AI-training roles.",
    description:
      "micro1 connects remote professionals with contract and full-time opportunities, including a growing set of AI-training and model-evaluation projects for leading AI companies. Roles span software engineering, science, business, and more.",
    link: "https://refer.micro1.ai/referral/jobs/?referralCode=c87efb7f-5993-4022-bf85-013ba13c55a5&utm_source=referral&utm_medium=share&utm_campaign=job_referral",
    linkLabel: "Visit micro1",
  },
  {
    id: "turing",
    name: "Turing",
    icon: "/logo-turing-icon.png",
    summary: "Research accelerator connecting experts with frontier AI labs for training and evaluation work.",
    description:
      "Turing works with frontier AI labs and enterprises to accelerate AI research, connecting engineers, researchers, and domain experts with paid project work spanning coding, reasoning, multilinguality, and more.",
    link: "https://work.turing.com/jobs",
    linkLabel: "Visit Turing",
  },
  {
    id: "xai",
    name: "xAI",
    icon: "/logo-xai-icon.png",
    summary: "The AI company behind Grok, hiring tutors and evaluators across many domains.",
    description:
      "xAI builds frontier AI systems, including Grok. Its open roles span AI tutoring, data evaluation, and engineering across domains like STEM, human data, finance, and more — most fully remote.",
    link: "https://x.ai/careers/open-roles?location=remote",
    linkLabel: "Visit xAI",
  },
  {
    id: "handshake",
    name: "Handshake AI",
    icon: "/logo-handshake-icon.png",
    summary: "Handshake's AI fellowship program pairing domain experts with paid, flexible AI-training projects.",
    description:
      "Handshake AI is a fellowship program connecting professionals across dozens of fields — from finance to nursing to engineering — with flexible, part-time projects that help train and evaluate AI models.",
    link: "https://joinhandshake.com/ai/opportunities",
    linkLabel: "Visit Handshake AI",
  },
];
type Filters = { domain: Set<string>; commitment: Set<string>; source: Set<string> };

// ─── Main component ───────────────────────────────────────────────────────────

export default function Home() {
  const [, navigate] = useLocation();
  const [matchJobDetail, jobRouteParams] = useRoute("/jobs/:id");
  const [matchJobsList] = useRoute("/jobs");
  const [matchCompanyDetail, companyRouteParams] = useRoute("/companies/:id");
  const [matchCompaniesList] = useRoute("/companies");
  const [matchDevelopers] = useRoute("/developers");

  // The URL is the source of truth for which view is showing — this is
  // what makes job/company pages real, shareable, crawlable URLs instead
  // of just in-memory state that resets on refresh.
  const view: View = matchJobDetail ? "detail"
    : matchJobsList ? "jobs"
    : matchCompanyDetail ? "companyDetail"
    : matchCompaniesList ? "companies"
    : matchDevelopers ? "developer"
    : "home";

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [search, setSearch] = useState("");
  const [locationQ, setLocationQ] = useState("");
  const [datePreset, setDatePreset] = useState<"" | "24h" | "month" | "custom">("");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [filters, setFilters] = useState<Filters>({ domain: new Set(), commitment: new Set(), source: new Set() });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [allMatchingJobs, setAllMatchingJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 24;
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [domains, setDomains] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [statRoles, setStatRoles] = useState(0);
  const [statPay, setStatPay] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [devEmail, setDevEmail] = useState("");
  const [apiSent, setApiSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companyJobCounts, setCompanyJobCounts] = useState<Record<string, number>>({});

  // Landing directly on /jobs/:id (a shared link, or a crawler) instead of
  // clicking through from the list — fetch that job if it isn't already
  // the one loaded.
  useEffect(() => {
    const id = jobRouteParams?.id;
    if (!id || selectedJobId === id) return;
    setSelectedJobId(id);
    fetch(`${API_BASE}/api/jobs/${id}`).then(r => r.json()).then(setSelectedJob).catch(() => {});
  }, [jobRouteParams?.id]);

  // Same for /companies/:id — companies are a local constant, not fetched,
  // so this is just a lookup rather than a network call.
  useEffect(() => {
    const id = companyRouteParams?.id;
    if (!id || selectedCompany?.id === id) return;
    const company = COMPANIES.find(c => c.id === id);
    if (company) setSelectedCompany(company);
  }, [companyRouteParams?.id]);

  // Shrink the nav once the page has scrolled past the top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate hero stats
  useEffect(() => {
    function anim(set: (v: number) => void, target: number, ms: number) {
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / ms);
        set(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    // Fetch real count from API for the stat
    fetch(`${API_BASE}/api/jobs?limit=1`)
      .then(r => r.json())
      .then(d => { anim(setStatRoles, d.total || 228, 1100); })
      .catch(() => anim(setStatRoles, 228, 1100));
    anim(setStatPay, 34, 1300);

    // Load domains and locations for filters
    fetch(`${API_BASE}/api/jobs/meta/domains`)
      .then(r => r.json())
      .then(setDomains)
      .catch(() => {});
    fetch(`${API_BASE}/api/jobs/meta/locations`)
      .then(r => r.json())
      .then(setLocations)
      .catch(() => {});
    fetch(`${API_BASE}/api/jobs/meta/sources`)
      .then(r => r.json())
      .then(setSources)
      .catch(() => {});

    // Featured jobs for the home page
    fetch(`${API_BASE}/api/jobs?limit=6`)
      .then(r => r.json())
      .then(d => setFeaturedJobs(d.jobs || []))
      .catch(() => {});

    // Per-company job counts for the Companies tab
    Promise.all(
      COMPANIES.map(c =>
        fetch(`${API_BASE}/api/jobs?source=${c.id}&limit=1`).then(r => r.json()).then(d => [c.id, d.total || 0] as const).catch(() => [c.id, 0] as const)
      )
    ).then(entries => setCompanyJobCounts(Object.fromEntries(entries)));
  }, []);

  // Reset to page 1 whenever the filters/search change (not on page changes themselves)
  useEffect(() => {
    setPage(1);
  }, [filters, search, locationQ, datePreset, customFrom, customTo]);

  // Fetch jobs whenever view=jobs, filters, or page change
  useEffect(() => {
    if (view !== "jobs") return;
    setLoadingJobs(true);
    const params = new URLSearchParams({ limit: String(PAGE_SIZE), offset: String((page - 1) * PAGE_SIZE) });
    if (filters.domain.size === 1) params.set("domain", [...filters.domain][0]);
    if (filters.commitment.size === 1) params.set("commitment", [...filters.commitment][0]);
    if (filters.source.size === 1) params.set("source", [...filters.source][0]);
    if (search) params.set("search", search);
    if (locationQ) params.set("location", locationQ);

    if (datePreset === "24h") {
      params.set("posted_after", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
    } else if (datePreset === "month") {
      params.set("posted_after", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
    } else if (datePreset === "custom") {
      if (customFrom) params.set("posted_after", new Date(customFrom).toISOString());
      if (customTo) params.set("posted_before", new Date(customTo + "T23:59:59").toISOString());
    }

    fetch(`${API_BASE}/api/jobs?${params}`)
      .then(r => r.json())
      .then(d => { setJobs(d.jobs || []); setTotalJobs(d.total || 0); })
      .catch(() => {})
      .finally(() => setLoadingJobs(false));
  }, [view, filters, search, locationQ, page, datePreset, customFrom, customTo]);

  // Filter chip counts need the *full* matching set, not just the current
  // page of 24 — deliberately excludes domain/commitment/source so a chip's
  // count reflects "how many jobs total have this", not "how many are on
  // the currently displayed page".
  useEffect(() => {
    if (view !== "jobs") return;
    const params = new URLSearchParams({ limit: "5000" });
    if (search) params.set("search", search);
    if (locationQ) params.set("location", locationQ);

    if (datePreset === "24h") {
      params.set("posted_after", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
    } else if (datePreset === "month") {
      params.set("posted_after", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
    } else if (datePreset === "custom") {
      if (customFrom) params.set("posted_after", new Date(customFrom).toISOString());
      if (customTo) params.set("posted_before", new Date(customTo + "T23:59:59").toISOString());
    }

    fetch(`${API_BASE}/api/jobs?${params}`)
      .then(r => r.json())
      .then(d => setAllMatchingJobs(d.jobs || []))
      .catch(() => {});
  }, [view, search, locationQ, datePreset, customFrom, customTo]);

  const goTo = useCallback((v: View, jobId?: string) => {
    setMobileOpen(false);
    if (v === "detail" && jobId) {
      setSelectedJobId(jobId);
      fetch(`${API_BASE}/api/jobs/${jobId}`)
        .then(r => r.json())
        .then(setSelectedJob)
        .catch(() => {});
      navigate(`/jobs/${jobId}`);
    } else {
      const path = v === "jobs" ? "/jobs" : v === "companies" ? "/companies" : v === "developer" ? "/developers" : "/";
      navigate(path);
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  const goToCompany = useCallback((company: Company) => {
    setSelectedCompany(company);
    setMobileOpen(false);
    navigate(`/companies/${company.id}`);
    window.scrollTo(0, 0);
  }, [navigate]);

  const goToCompanyJobs = useCallback((companyId: Job["source"]) => {
    setFilters({ domain: new Set(), commitment: new Set(), source: new Set([companyId]) });
    setMobileOpen(false);
    navigate("/jobs");
    window.scrollTo(0, 0);
  }, [navigate]);

  // "About" isn't its own page — it's a section at the bottom of Home.
  // Navigate home first (if needed), then scroll down to it.
  const goToAbout = useCallback(() => {
    setMobileOpen(false);
    navigate("/");
    requestAnimationFrame(() => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    });
  }, [navigate]);

  const toggleFilter = useCallback((dim: keyof Filters, val: string) => {
    setFilters(prev => {
      const next = new Set(prev[dim]);
      next.has(val) ? next.delete(val) : next.add(val);
      return { ...prev, [dim]: next };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ domain: new Set(), commitment: new Set(), source: new Set() });
    setLocationQ("");
    setDatePreset("");
    setCustomFrom("");
    setCustomTo("");
  }, []);

  const hasFilters = filters.domain.size + filters.commitment.size + filters.source.size > 0
    || locationQ.length > 0 || datePreset.length > 0;

  const COMMITMENTS = ["hourly", "part-time", "full-time"];

  const FIELD_BY_DIM: Record<keyof Filters, string> = { domain: "listing_domain", commitment: "commitment", source: "source" };

  function chips(dim: keyof Filters, opts: string[]) {
    return opts.map(label => ({
      label,
      count: allMatchingJobs.filter(j => (j as Record<string, unknown>)[FIELD_BY_DIM[dim]] === label).length,
      active: filters[dim].has(label),
      onClick: () => toggleFilter(dim, label),
    }));
  }

  const navClass = (v: View | View[]) =>
    `navlink${(Array.isArray(v) ? v : [v]).includes(view) ? " active" : ""}`;

  return (
    <div className="ds-app">

      {/* Nav */}
      <div className={`ds-navwrap${scrolled ? " ds-navwrap-scrolled" : ""}`}>
        <nav className="ds-nav">
          <div className="ds-navleft" onClick={() => goTo("home")}>
            <img src="/logo-gradient.png" alt="Gradient Consulting" className="ds-wordmark-img" />
          </div>
          <div className="ds-navlinks">
            <button className={navClass("home")} onClick={() => goTo("home")}>Home</button>
            <button className={navClass(["jobs", "detail"])} onClick={() => goTo("jobs")}>Jobs</button>
            <button className={navClass(["companies", "companyDetail"])} onClick={() => goTo("companies")}>Companies</button>
            <button className={navClass("developer")} onClick={() => goTo("developer")}>Developers</button>
            <button className="navlink" onClick={goToAbout}>About</button>
          </div>
          <div className="ds-navright">
            <Btn size="sm" onClick={() => goTo("jobs")}>Browse roles</Btn>
            <button className="ds-hamburger" onClick={() => setMobileOpen(o => !o)}>☰</button>
          </div>
        </nav>
        {mobileOpen && (
          <div className="ds-mobilemenu">
            <button className="navlink" onClick={() => goTo("home")}>Home</button>
            <button className="navlink" onClick={() => goTo("jobs")}>Jobs</button>
            <button className="navlink" onClick={() => goTo("companies")}>Companies</button>
            <button className="navlink" onClick={() => goTo("developer")}>Developers</button>
            <button className="navlink" onClick={goToAbout}>About</button>
          </div>
        )}
      </div>

      {/* Views */}
      {view === "home" && (
        <HomeView
          statRoles={statRoles} statPay={statPay} statPlatforms={sources.length || 2}
          search={search} setSearch={setSearch} locationQ={locationQ} setLocationQ={setLocationQ}
          featuredJobs={featuredJobs}
          onSearch={() => goTo("jobs")} onBrowse={() => goTo("jobs")} onOpen={(id) => goTo("detail", id)}
        />
      )}
      {(view === "jobs" || (view === "detail" && !selectedJob)) && (
        <JobsView
          jobs={jobs} total={totalJobs} loadingJobs={loadingJobs}
          hasFilters={hasFilters} chips={chips} domains={domains}
          commitments={COMMITMENTS} locations={locations} sources={sources}
          locationQ={locationQ} setLocationQ={setLocationQ}
          page={page} setPage={setPage} pageSize={PAGE_SIZE}
          datePreset={datePreset} setDatePreset={setDatePreset}
          customFrom={customFrom} setCustomFrom={setCustomFrom}
          customTo={customTo} setCustomTo={setCustomTo}
          clearFilters={clearFilters} onOpen={(id) => goTo("detail", id)}
        />
      )}
      {view === "detail" && selectedJob && (
        <DetailView
          job={selectedJob}
          onBack={() => goTo("jobs")} onOpen={(id) => goTo("detail", id)}
        />
      )}
      {view === "developer" && (
        <DevView devEmail={devEmail} setDevEmail={setDevEmail} apiSent={apiSent} setApiSent={setApiSent} />
      )}
      {view === "companies" && (
        <CompaniesView jobCounts={companyJobCounts} onOpen={goToCompany} />
      )}
      {view === "companyDetail" && selectedCompany && (
        <CompanyDetailView
          company={selectedCompany} jobCount={companyJobCounts[selectedCompany.id] || 0}
          onBack={() => goTo("companies")} onViewJobs={() => goToCompanyJobs(selectedCompany.id)}
        />
      )}

      {/* Footer */}
      <footer className="ds-footer">
        <div>© 2026 Gradient Consulting</div>
        <div className="ds-flinks">
          <span onClick={() => goTo("jobs")}>Jobs</span>
          <span onClick={() => goTo("companies")}>Companies</span>
          <span onClick={() => goTo("developer")}>Developers</span>
          <span onClick={goToAbout}>About</span>
        </div>
      </footer>
    </div>
  );
}

// ─── Home view ────────────────────────────────────────────────────────────────

function HomeView({ statRoles, statPay, statPlatforms, search, setSearch, locationQ, setLocationQ, featuredJobs, onSearch, onBrowse, onOpen }: {
  statRoles: number; statPay: number; statPlatforms: number;
  search: string; setSearch: (v: string) => void;
  locationQ: string; setLocationQ: (v: string) => void;
  featuredJobs: Job[];
  onSearch: () => void; onBrowse: () => void; onOpen: (id: string) => void;
}) {
  return (
    <>
      <div className="ds-hero">
        <div className="ds-hero-glow" />
        <div className="ds-hero-content">
          <Eyebrow>{statRoles} open roles, refreshed hourly</Eyebrow>
          <h1>Every AI training gig,<br />one search away.</h1>
          <p className="ds-sub">Gradient Consulting pulls live roles from Mercor, micro1, Turing, xAI, and Handshake AI into a single queue — so you compare pay and hours without checking five inboxes.</p>
          <div className="ds-searchbar">
            <div className="ds-searchfield">
              <input type="text" placeholder="Role — e.g. RLHF" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="ds-searchdivider" />
            <div className="ds-searchfield">
              <input type="text" placeholder="Location or Remote" value={locationQ} onChange={e => setLocationQ(e.target.value)} />
            </div>
            <Btn onClick={onSearch}>Search</Btn>
          </div>
          <div className="ds-statsline">
            <div className="ds-stat"><div className="ds-stat-num">{statRoles}</div><div className="ds-stat-label">Open roles</div></div>
            <div className="ds-stat"><div className="ds-stat-num">{statPlatforms}</div><div className="ds-stat-label">Platforms tracked</div></div>
            <div className="ds-stat"><div className="ds-stat-num">${statPay}/hr</div><div className="ds-stat-label">Avg. reported pay</div></div>
          </div>
        </div>
      </div>

      {featuredJobs.length > 0 && (
        <div className="ds-section">
          <div className="ds-sectionhead">
            <div>
              <Eyebrow>Featured roles</Eyebrow>
              <h2>Fresh off the queue.</h2>
            </div>
            <button className="ds-viewall" onClick={onBrowse}>View all jobs →</button>
          </div>
          <div className="ds-jobgrid">
            {featuredJobs.map((job, i) => (
              <JobCard key={job.listing_id} job={job} delay={i * 40} onOpen={onOpen} />
            ))}
          </div>
        </div>
      )}

      <div className="ds-section">
        <Eyebrow>Coming to your dashboard</Eyebrow>
        <h2>Your whole job hunt, tracked.</h2>
        <p className="ds-lede">Past the search bar, we're building the tools to manage the whole application — not just find it.</p>
        <div className="ds-teasergrid">
          {[
            { title: "CV review status", desc: "Upload once. Track which platforms have reviewed, flagged, or shortlisted your profile." },
            { title: "Mock interview practice", desc: "Run through the screening questions each platform actually asks, before you're on the clock." },
            { title: "Saved jobs", desc: "Keep a running shortlist across every source platform, sorted by pay or deadline." },
          ].map(c => (
            <Card key={c.title}>
              <Badge tone="breeze">Soon</Badge>
              <div className="ds-ttitle">{c.title}</div>
              <div className="ds-tdesc">{c.desc}</div>
            </Card>
          ))}
        </div>
      </div>

      <div className="ds-ctaband">
        <h3>Ready to see today's roles?</h3>
        <Btn size="lg" onClick={onBrowse}>Browse all roles</Btn>
      </div>

      <div id="about" className="ds-section" style={{ scrollMarginTop: 80 }}>
        <Eyebrow>How it works</Eyebrow>
        <h2>From scattered platforms<br />to one queue.</h2>
        <div className="ds-stepsgrid" style={{ marginTop: 24 }}>
          {[
            { num: "01", title: "Tell us what you're looking for", body: "Role type, experience level, and how many hours a week you want to work." },
            { num: "02", title: "We pull live roles, hourly", body: "Mercor, micro1, Turing, xAI, Handshake AI and more — deduplicated and tagged by pay and skill." },
            { num: "03", title: "Apply once, track everywhere", body: "Every application routes to the source platform directly — no extra accounts." },
          ].map(s => (
            <Card key={s.num}>
              <div className="ds-stepcard">
                <div className="ds-stepnum">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="ds-ctaband">
        <h3>Start comparing roles today.</h3>
        <Btn size="lg" onClick={onBrowse}>Browse all roles</Btn>
      </div>
    </>
  );
}

// ─── Jobs view ────────────────────────────────────────────────────────────────

function JobsView({ jobs, total, loadingJobs, hasFilters, chips, domains, commitments, locations, sources, locationQ, setLocationQ, page, setPage, pageSize, datePreset, setDatePreset, customFrom, setCustomFrom, customTo, setCustomTo, clearFilters, onOpen }: {
  jobs: Job[]; total: number; loadingJobs: boolean; hasFilters: boolean;
  domains: string[]; commitments: string[]; locations: string[]; sources: string[];
  locationQ: string; setLocationQ: (v: string) => void;
  page: number; setPage: (v: number) => void; pageSize: number;
  datePreset: "" | "24h" | "month" | "custom"; setDatePreset: (v: "" | "24h" | "month" | "custom") => void;
  customFrom: string; setCustomFrom: (v: string) => void;
  customTo: string; setCustomTo: (v: string) => void;
  chips: (dim: keyof Filters, opts: string[]) => { label: string; count: number; active: boolean; onClick: () => void }[];
  clearFilters: () => void; onOpen: (id: string) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const rangeStart = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, total);

  return (
    <>
      <div className="ds-pageheader">
        <Eyebrow>Job listings</Eyebrow>
        <h1>Find your next gig.</h1>
      </div>
      <div className="ds-jobslayout">
        <div>
          <div className="ds-resultsrow">
            <span className="ds-rcount">{total === 0 ? "0 roles match" : `${rangeStart}–${rangeEnd} of ${total} roles`}</span>
          </div>
          {loadingJobs && (
            <div className="ds-jobgrid">
              {[0,1,2,3,4,5].map(i => <div key={i} className="ds-skeleton" />)}
            </div>
          )}
          {!loadingJobs && jobs.length === 0 && (
            <div className="ds-emptystate">
              <p>No roles match those filters yet.</p>
              <Btn variant="outline" onClick={clearFilters}>Clear filters</Btn>
            </div>
          )}
          {!loadingJobs && jobs.length > 0 && (
            <>
              <div className="ds-jobgrid">
                {jobs.map((job, i) => (
                  <JobCard key={job.listing_id} job={job} delay={i * 40} onOpen={onOpen} />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </>
          )}
        </div>

        <aside className="ds-filterpanel">
          <div className="ds-filterhead">
            <h3>Filters</h3>
            {hasFilters && <button className="ds-clearbtn" onClick={clearFilters}>Clear all</button>}
          </div>
          <div className="ds-filtergroup">
            <Eyebrow>Location</Eyebrow>
            <select
              className="ds-select"
              value={locationQ}
              onChange={e => setLocationQ(e.target.value)}
            >
              <option value="">All locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div className="ds-filtergroup">
            <Eyebrow>Posted</Eyebrow>
            <div className="ds-chiprow">
              {([
                { key: "24h", label: "Last 24 hours" },
                { key: "month", label: "Last month" },
                { key: "custom", label: "Custom" },
              ] as const).map(opt => (
                <button
                  key={opt.key}
                  className={`ds-chip${datePreset === opt.key ? " active" : ""}`}
                  onClick={() => setDatePreset(datePreset === opt.key ? "" : opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {datePreset === "custom" && (
              <div className="ds-daterow">
                <input type="date" className="ds-dateinput" value={customFrom} onChange={e => setCustomFrom(e.target.value)} />
                <span>to</span>
                <input type="date" className="ds-dateinput" value={customTo} onChange={e => setCustomTo(e.target.value)} />
              </div>
            )}
          </div>
          <div className="ds-filtergroup">
            <Eyebrow>Domain</Eyebrow>
            <div className="ds-chiprow">
              {chips("domain", domains).map(c => (
                <button key={c.label} className={`ds-chip${c.active ? " active" : ""}`} onClick={c.onClick}>
                  {c.label} <span className="ds-chip-cnt">{c.count}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="ds-filtergroup">
            <Eyebrow>Commitment</Eyebrow>
            <div className="ds-chiprow">
              {chips("commitment", commitments).map(c => (
                <button key={c.label} className={`ds-chip${c.active ? " active" : ""}`} onClick={c.onClick}>
                  {c.label} <span className="ds-chip-cnt">{c.count}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="ds-filtergroup">
            <Eyebrow>Source</Eyebrow>
            <div className="ds-chiprow">
              {chips("source", sources).map(c => (
                <button key={c.label} className={`ds-chip${c.active ? " active" : ""}`} onClick={c.onClick}>
                  {SOURCE_CONFIG[c.label as Job["source"]]?.name || c.label} <span className="ds-chip-cnt">{c.count}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null;

  // Build a compact page list: first, last, current ± 1, with "…" gaps elsewhere.
  const pages: (number | "…")[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const go = (p: number) => {
    onChange(Math.min(totalPages, Math.max(1, p)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="ds-pagination" aria-label="Pagination">
      <button className="ds-pagebtn" disabled={page === 1} onClick={() => go(page - 1)}>← Prev</button>
      {pages.map((p, i) => p === "…" ? (
        <span key={`gap-${i}`} className="ds-pagegap">…</span>
      ) : (
        <button
          key={p}
          className={`ds-pagebtn${p === page ? " active" : ""}`}
          onClick={() => go(p)}
        >
          {p}
        </button>
      ))}
      <button className="ds-pagebtn" disabled={page === totalPages} onClick={() => go(page + 1)}>Next →</button>
    </nav>
  );
}

function JobCard({ job, delay, onOpen }: { job: Job; delay: number; onOpen: (id: string) => void }) {
  const src = SOURCE_CONFIG[job.source];
  return (
    <Card style={{ animationDelay: `${delay}ms` }}>
      <div className="ds-jobcard" onClick={() => onOpen(job.listing_id)}>
        <div className="ds-jobtop">
          <div className={`ds-logochip${src.fill ? " ds-logochip-fill" : ""}`}>
            {src.icon ? <img src={src.icon} alt={src.name} /> : <span className="ds-logoletter">{src.name[0]}</span>}
          </div>
          <div className="ds-jobcompany">
            <div className="ds-cname">
              {src.name}
              <img className="ds-verified" src="/verified-badge.png" alt="Verified" />
              {job.is_new === 1 && <Badge tone="breeze">New</Badge>}
            </div>
            <div className="ds-jobmeta">{[job.work_arrangement, job.commitment].filter(Boolean).join(" · ")}</div>
          </div>
        </div>
        <div className="ds-jobtitle">{job.title}</div>
        {job.listing_domain && (
          <div className="ds-tagrow"><span className="ds-tag">{job.listing_domain}</span></div>
        )}
        {job.posted_at && <div className="ds-postedon">{postedLabel(job.posted_at)}</div>}
        <div className="ds-jobbottom">
          <span className="ds-paytag">{payLabel(job)}</span>
          {job.hours_per_week && <span className="ds-applicants">{job.hours_per_week}h/wk</span>}
          <Btn variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); window.open(job.referral_url || "#", "_blank"); }}>
            Apply now
          </Btn>
        </div>
      </div>
    </Card>
  );
}

// ─── Detail view ──────────────────────────────────────────────────────────────

function DetailView({ job, onBack, onOpen }: {
  job: Job; onBack: () => void; onOpen: (id: string) => void;
}) {
  const src = SOURCE_CONFIG[job.source];
  return (
    <div className="ds-detailwrap">
      <button className="ds-backlink" onClick={onBack}>← All jobs</button>
      <div className="ds-jobtop" style={{ margin: "20px 0 8px" }}>
        <div className={`ds-logochip${src.fill ? " ds-logochip-fill" : ""}`}>
          {src.icon ? <img src={src.icon} alt={src.name} /> : <span className="ds-logoletter">{src.name[0]}</span>}
        </div>
        <div className="ds-jobcompany">
          <div className="ds-cname">
            {src.name}
            <img className="ds-verified" src="/verified-badge.png" alt="Verified" />
          </div>
          <div className="ds-jobmeta">{job.work_arrangement} · {job.commitment}</div>
        </div>
      </div>
      <h1 className="ds-detailtitle">{job.title}</h1>
      <div className="ds-tagrow" style={{ marginBottom: 20 }}>
        {job.listing_domain && <Badge>{job.listing_domain}</Badge>}
        {job.commitment && <Badge>{job.commitment}</Badge>}
        {job.work_arrangement && <Badge tone="breeze">{job.work_arrangement}</Badge>}
        {job.location && job.location.toLowerCase() !== job.work_arrangement?.toLowerCase() && <Badge>{job.location}</Badge>}
      </div>
      {job.posted_at && <div className="ds-postedon" style={{ marginBottom: 16 }}>{postedLabel(job.posted_at)}</div>}
      {job.description && (
        <div className="ds-detailbody">
          <Streamdown>{job.description}</Streamdown>
        </div>
      )}
      <Card style={{ marginTop: 24 }}>
        <div className="ds-applycard">
          <div>
            <div className="ds-paylabel">Pay range</div>
            <div className="ds-payval">{payLabel(job)}</div>
            {job.hours_per_week && <div style={{ fontSize: 13, color: "var(--color-body-mid)", marginTop: 4 }}>{job.hours_per_week}h/wk</div>}
          </div>
          <Btn size="lg" onClick={() => window.open(job.referral_url || "#", "_blank")}>
            Apply now →
          </Btn>
        </div>
      </Card>
      {job.referral_amount && (
        <div style={{ marginTop: 16, fontSize: 13, color: "var(--color-accent-money)" }}>
          Earn ${job.referral_amount.toLocaleString()} for each successful referral on this role.
        </div>
      )}
    </div>
  );
}

// ─── Dev view ─────────────────────────────────────────────────────────────────

function DevView({ devEmail, setDevEmail, apiSent, setApiSent }: {
  devEmail: string; setDevEmail: (v: string) => void; apiSent: boolean; setApiSent: (v: boolean) => void;
}) {
  return (
    <>
      <div className="ds-pageheader">
        <Eyebrow>For developers</Eyebrow>
        <h1>Real AI-gig data,<br />one API.</h1>
      </div>
      <div className="ds-devgrid">
        <div>
          <p className="ds-lede" style={{ marginBottom: 24 }}>License the same feed that powers Gradient Consulting — every open role from Mercor, micro1, Turing, xAI, Handshake AI and more, deduplicated and tagged by pay, category, and experience level. Updated hourly.</p>
          <div className="ds-devemailrow">
            <input className="ds-input" type="email" placeholder="you@company.com" value={devEmail} onChange={e => setDevEmail(e.target.value)} />
            <Btn onClick={() => setApiSent(true)}>{apiSent ? "Key sent ✓" : "Get API key"}</Btn>
          </div>
        </div>
        <div className="ds-codecard"><pre>{JSON_SAMPLE}</pre></div>
      </div>
      <div className="ds-pageheader" style={{ paddingTop: 8 }}>
        <Eyebrow>Pricing</Eyebrow>
      </div>
      <div className="ds-pricinggrid">
        {([
          { tier: "Free", price: "$0", features: ["100 requests / day", "15-minute cache delay", "Community support"], highlight: false },
          { tier: "Team", price: "$49/mo", features: ["25,000 requests / day", "Real-time updates", "Webhooks"], highlight: true },
          { tier: "Enterprise", price: "Custom", features: ["Unlimited requests", "Dedicated feed & SLA", "Priority support"], highlight: false },
        ] as const).map(({ tier, price, features, highlight }) => (
          <Card key={tier} className={highlight ? "ds-card-highlight" : ""}>
            <div className="ds-pricecard">
              <div className="ds-tier">{tier}</div>
              <div className="ds-price">{price}</div>
              <ul>{features.map(f => <li key={f}>{f}</li>)}</ul>
              <Btn variant={highlight ? "primary" : "outline"} full>
                {tier === "Enterprise" ? "Talk to us" : "Choose plan"}
              </Btn>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function CompaniesView({ jobCounts, onOpen }: { jobCounts: Record<string, number>; onOpen: (c: Company) => void }) {
  return (
    <>
      <div className="ds-pageheader">
        <Eyebrow>Partners</Eyebrow>
        <h1>The companies behind the roles.</h1>
        <p className="ds-lede">Every job on Gradient Consulting comes from one of these platforms. Here's who they are.</p>
      </div>
      <div className="ds-companygrid">
        {COMPANIES.map(c => (
          <Card key={c.id} className="ds-companycard" style={{ cursor: "pointer" }}>
            <div className="ds-companycard-inner" onClick={() => onOpen(c)}>
              <div className="ds-jobtop">
                <div className="ds-logochip"><img src={c.icon} alt={c.name} /></div>
                <div className="ds-jobcompany">
                  <div className="ds-cname">
                    {c.name}
                    <img className="ds-verified" src="/verified-badge.png" alt="Verified" />
                  </div>
                  <div className="ds-rolestat">{jobCounts[c.id] ?? "…"} open roles</div>
                </div>
                <svg className="ds-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="ds-companydesc">{c.summary}</p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function CompanyDetailView({ company, jobCount, onBack, onViewJobs }: {
  company: Company; jobCount: number; onBack: () => void; onViewJobs: () => void;
}) {
  return (
    <div className="ds-detailwrap">
      <button className="ds-backlink" onClick={onBack}>← All companies</button>
      <div className="ds-jobtop" style={{ margin: "20px 0 8px" }}>
        <div className="ds-logochip"><img src={company.icon} alt={company.name} /></div>
        <div className="ds-jobcompany">
          <div className="ds-cname">
            {company.name}
            <img className="ds-verified" src="/verified-badge.png" alt="Verified" />
          </div>
          <div className="ds-jobmeta">{jobCount} open roles on Gradient Consulting</div>
        </div>
      </div>
      <h1 className="ds-jobtitle" style={{ marginTop: 20 }}>{company.summary}</h1>
      <div className="ds-detailbody" style={{ marginTop: 20 }}>
        <p>{company.description}</p>
      </div>
      <div className="ds-companyactions">
        <Btn onClick={onViewJobs}>View open roles</Btn>
        <a href={company.link} target="_blank" rel="noopener noreferrer">
          <Btn variant="outline">{company.linkLabel}</Btn>
        </a>
      </div>
    </div>
  );
}

