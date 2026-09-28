# SetuChain Advisory — Supply Chain Consulting Business App

ITBT Live Class Exercise: *Build a Digital Business App*
**Student:** Rishabh Sahu, MBA (Logistics & Supply Chain Management), Gati Shakti Vishwavidyalaya, Vadodara

**Live site:** `https://<your-github-username>.github.io/RishabhSahu-BusinessApp/`

---

## 1. Business (Step 1)
**Supply Chain Consulting Company** — *SetuChain Advisory*, Vadodara, Gujarat.
"Setu" means bridge: the firm bridges the gap between how a supply chain is planned and how it actually runs.

## 2. Problem → App (Step 2)

| Business | Customer | Problem | Solution | Features |
|---|---|---|---|---|
| Supply chain consulting firm | Mid-size manufacturers, MSMEs, FMCG/pharma distributors, 3PLs | Clients don't know where their project stands or what savings have been delivered until the next review meeting; managers lack one view of which engagements are on track | **Client Project Tracker + Manager Engagement Dashboard** | Project ID lookup, phase timeline, savings to date, KPI dashboard, charts, status filter, enquiry form |

## 3. Website sections (Step 3)

| # | Section | Contents |
|---|---|---|
| 1 | **Home** | Business name, logo, purpose, short description, **Get Started** button |
| 2 | **About** | What the company does, target customers, service area, value proposition, problem statement |
| 3 | **Services** | Table of 6 services with description, duration and price (₹75,000 – ₹5,00,000) |
| 4 | **Dashboard** | 8 KPIs, 2 charts, engagement status table with filter |
| 5 | **Contact / Enquiry** | Email, phone, location (Google Maps), LinkedIn, enquiry form |
| + | **Track Project** | The interactive business feature |

## 4. Hyperlinks with a business purpose (Step 4)

| Link | Purpose |
|---|---|
| Home → Services ("Get Started") | Moves a visitor straight to what we sell and the prices |
| Home → Track Project | Existing clients jump straight to their project status |
| Services → Contact ("Send us an enquiry") | Converts interest into a sales lead |
| About → Tracker / Dashboard | Shows the problem statement is solved by the app |
| Dashboard → Order Tracking (click any Project ID) | Manager drills down from the table into one project's details |
| Email (`mailto:`) | Client can email the firm directly |
| Phone (`tel:`) | One-tap call on mobile |
| Google Maps | Shows the office location in Vadodara |
| LinkedIn | Credibility — founder's professional profile |
| ULIP (goulip.in) | Government logistics data platform used for control-tower projects |
| DFCCIL (dfccil.com) | Dedicated Freight Corridor, relevant to road-to-rail modal shift studies |
| ASCM (ascm.org) | Industry body whose SCOR standards the firm follows |

## 5. Interactive business feature (Step 5)
**Track Project** — enter a Project ID and see status, phase, consultant, savings, completion date and next milestone.

```
Enter Project ID → SC-1025 → Status: On Track · Phase: Implement · 65% complete
```

Sample IDs: `SC-1018` (Completed), `SC-1025` (On Track), `SC-1027` (At Risk), `SC-1031` (Delayed), `SC-1040` (just started).
Bonus: the dashboard also has a **status filter**, and the **enquiry form** opens a pre-filled email with a reference number.

## 6. Manager dashboard (Step 6)
*"What does the Engagement Manager need to know immediately?"*

| KPI | Value | Why the manager cares |
|---|---|---|
| Active engagements | 24 | Current workload |
| On-schedule projects | 83% | Delivery performance vs 85% target |
| Client savings delivered (FY) | ₹18.6 Cr | The value we create — our main selling point |
| Consultant utilisation | 78% | Are we over- or under-staffed? |
| At-risk / delayed projects | 3 | Where to intervene today |
| Client satisfaction | 4.6 / 5 | Service quality and repeat business |
| Revenue billed (FY) | ₹2.9 Cr | Financial health vs target |
| Sales pipeline | ₹4.2 Cr | Future work |

**Charts:** monthly client savings (Apr–Sep 2026) and active engagements by service line — both with hover tooltips.
**Table:** every engagement with progress bar and status, filterable by On Track / At Risk / Delayed / Completed.

*All figures are illustrative sample data for a class exercise.*

## 7. Repository structure (Step 7)
```
RishabhSahu-BusinessApp/
├── index.html      # all sections
├── style.css       # layout, responsive + dark mode
├── script.js       # tracker, dashboard charts, filter, enquiry form
├── images/
│   ├── logo.svg
│   └── network.svg
└── README.md
```
Pure HTML/CSS/JavaScript — no libraries, no build step, works offline.

## How to publish on GitHub Pages
1. Sign in to GitHub → **New repository** → name it `RishabhSahu-BusinessApp` → **Public** → Create.
2. Click **uploading an existing file** → drag in `index.html`, `style.css`, `script.js`, `README.md` and the `images` folder → **Commit changes**.
3. Go to **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main** / **(root)** → **Save**.
4. Wait 1–2 minutes and refresh; the live link appears at the top of the Pages screen:
   `https://<your-github-username>.github.io/RishabhSahu-BusinessApp/`
5. Submit that link.

## 2-minute presentation
1. **What is your business?** SetuChain Advisory, a supply chain consulting firm in Vadodara serving Indian manufacturers and distributors.
2. **What problem are you solving?** Clients can't see where their consulting project stands or what savings it has delivered, and managers have no single view of engagement health.
3. **Who is your customer?** Mid-size manufacturers, MSME clusters, FMCG and pharma distributors, and 3PLs in Gujarat, Maharashtra, Rajasthan and NCR.
4. **What does your app do?** Lets clients track their project by ID 24×7, shows our services and prices, and captures enquiries.
5. **What does the dashboard tell the manager?** Workload, on-schedule %, savings delivered, consultant utilisation, at-risk projects, satisfaction, revenue and pipeline — plus which specific projects need attention today.
