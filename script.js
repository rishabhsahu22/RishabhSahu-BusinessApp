/* ===== SetuChain Advisory - app logic ===== */

// ---------- Sample business data ----------
const PHASES = ["Kick-off", "Diagnose", "Design", "Implement", "Handover"];

const projects = [
  { id: "SC-1018", client: "Narmada Agro Foods", service: "Inventory Optimisation", consultant: "Ananya Mehta", phase: 4, progress: 100, status: "Completed", start: "02 Jun 2026", end: "14 Aug 2026", savings: 42, next: "Post-project review on 15 Oct 2026" },
  { id: "SC-1021", client: "Sabarmati Textiles", service: "Supply Chain Diagnostic", consultant: "Karan Desai", phase: 4, progress: 100, status: "Completed", start: "20 Jul 2026", end: "03 Aug 2026", savings: 0, next: "Proposal for Network Design shared" },
  { id: "SC-1025", client: "Vadodara Pharma Distributors", service: "Transport & Freight Cost Reduction", consultant: "Rishabh Sahu", phase: 3, progress: 65, status: "On Track", start: "04 Aug 2026", end: "16 Oct 2026", savings: 18, next: "Road-to-rail pilot on Western DFC - 05 Oct 2026" },
  { id: "SC-1027", client: "Kutch Salt & Chemicals", service: "Network & Warehouse Design", consultant: "Priya Nair", phase: 2, progress: 45, status: "At Risk", start: "11 Aug 2026", end: "06 Oct 2026", savings: 0, next: "Awaiting 12-month shipment data from client ERP" },
  { id: "SC-1029", client: "Surat Polymers Ltd", service: "S&OP Implementation", consultant: "Karan Desai", phase: 3, progress: 58, status: "On Track", start: "18 Aug 2026", end: "27 Oct 2026", savings: 9, next: "First consensus S&OP meeting - 07 Oct 2026" },
  { id: "SC-1031", client: "Anand Dairy Cooperative", service: "Digital Control Tower Setup", consultant: "Ananya Mehta", phase: 2, progress: 30, status: "Delayed", start: "25 Aug 2026", end: "17 Nov 2026", savings: 0, next: "Transporter GPS API access pending (2 weeks late)" },
  { id: "SC-1034", client: "Rajkot Auto Components", service: "Inventory Optimisation", consultant: "Priya Nair", phase: 1, progress: 20, status: "On Track", start: "08 Sep 2026", end: "20 Oct 2026", savings: 0, next: "ABC-XYZ classification review - 01 Oct 2026" },
  { id: "SC-1036", client: "Bharuch Fertilisers", service: "Transport & Freight Cost Reduction", consultant: "Rishabh Sahu", phase: 1, progress: 15, status: "On Track", start: "14 Sep 2026", end: "26 Oct 2026", savings: 0, next: "Lane-wise freight data collection" },
  { id: "SC-1040", client: "Gandhinagar FMCG Traders", service: "Supply Chain Diagnostic", consultant: "Karan Desai", phase: 0, progress: 5, status: "On Track", start: "22 Sep 2026", end: "06 Oct 2026", savings: 0, next: "Site visit to main warehouse - 30 Sep 2026" },
];

const kpis = [
  { label: "Active engagements", value: "24", note: "+4 vs last quarter", dir: "up" },
  { label: "On-schedule projects", value: "83%", note: "Target 85%", dir: "down" },
  { label: "Client savings delivered (FY)", value: "₹18.6 Cr", note: "+22% YoY", dir: "up" },
  { label: "Consultant utilisation", value: "78%", note: "Target 75-85%", dir: "" },
  { label: "At-risk / delayed projects", value: "3", note: "Needs manager attention", dir: "down" },
  { label: "Client satisfaction", value: "4.6 / 5", note: "From 38 closed projects", dir: "up" },
  { label: "Revenue billed (FY)", value: "₹2.9 Cr", note: "64% of annual target", dir: "" },
  { label: "Sales pipeline", value: "₹4.2 Cr", note: "11 proposals open", dir: "up" },
];

const monthlySavings = [
  { m: "Apr", v: 210 }, { m: "May", v: 265 }, { m: "Jun", v: 240 },
  { m: "Jul", v: 330 }, { m: "Aug", v: 395 }, { m: "Sep", v: 420 },
];

const serviceLines = [
  { s: "Transport & Freight", v: 7 },
  { s: "Inventory Optimisation", v: 5 },
  { s: "Diagnostic", v: 4 },
  { s: "S&OP", v: 3 },
  { s: "Network Design", v: 3 },
  { s: "Control Tower", v: 2 },
];

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const statusClass = (s) => s.toLowerCase().replace(/\s+/g, "-");
const STATUS_ICON = { "On Track": "✔", "At Risk": "⚠", "Delayed": "✖", "Completed": "●" };
const badge = (s) => `<span class="badge ${statusClass(s)}"><span aria-hidden="true">${STATUS_ICON[s]}</span>${s}</span>`;

// ---------- Mobile nav ----------
const toggle = $(".nav-toggle");
const links = $(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => { if (e.target.tagName === "A") links.classList.remove("open"); });

// ---------- Business feature: Track project ----------
function trackProject(rawId) {
  const id = rawId.trim().toUpperCase().replace(/^SC(\d)/, "SC-$1");
  const out = $("#track-result");
  const p = projects.find((x) => x.id === id);
  if (!p) {
    out.innerHTML = `<p class="not-found">No project found for “${esc(rawId)}”. Please check the ID on your engagement letter or <a href="#contact">contact us</a>.</p>`;
    return;
  }
  const phases = PHASES.map((ph, i) => {
    const cls = p.status === "Completed" || i < p.phase ? "done" : i === p.phase ? "current" : "";
    return `<li class="${cls}">${ph}</li>`;
  }).join("");
  out.innerHTML = `
    <div class="track-top">
      <div><h3>${p.id} &middot; ${esc(p.client)}</h3><p style="margin:0;color:var(--text-2)">${esc(p.service)}</p></div>
      ${badge(p.status)}
    </div>
    <dl class="track-grid">
      <div><dt>Current phase</dt><dd>${PHASES[p.phase]}</dd></div>
      <div><dt>Lead consultant</dt><dd>${esc(p.consultant)}</dd></div>
      <div><dt>Savings to date</dt><dd>${p.savings ? "₹" + p.savings + " lakh" : "Not yet measured"}</dd></div>
      <div><dt>Start date</dt><dd>${p.start}</dd></div>
      <div><dt>Expected completion</dt><dd>${p.end}</dd></div>
      <div><dt>Next milestone</dt><dd>${esc(p.next)}</dd></div>
    </dl>
    <div class="progress" role="progressbar" aria-valuenow="${p.progress}" aria-valuemin="0" aria-valuemax="100"><span style="width:${p.progress}%"></span></div>
    <p style="margin:6px 0 0;font-size:.85rem;color:var(--text-2)">${p.progress}% complete</p>
    <ul class="phases">${phases}</ul>`;
}
$("#track-form").addEventListener("submit", (e) => { e.preventDefault(); trackProject($("#project-id").value); });
document.querySelectorAll(".chip-btn").forEach((b) =>
  b.addEventListener("click", () => { $("#project-id").value = b.dataset.id; trackProject(b.dataset.id); })
);

// ---------- Dashboard: KPIs ----------
$("#kpis").innerHTML = kpis.map((k) => `
  <div class="kpi">
    <div class="label">${k.label}</div>
    <div class="value">${k.value}</div>
    <div class="note ${k.dir}">${k.note}</div>
  </div>`).join("");

// ---------- Tooltip ----------
const tip = $("#tooltip");
function showTip(e, html) { tip.innerHTML = html; tip.hidden = false; moveTip(e); }
function moveTip(e) {
  const x = Math.min(e.clientX + 14, window.innerWidth - tip.offsetWidth - 8);
  tip.style.left = x + "px"; tip.style.top = (e.clientY - 40) + "px";
}
function hideTip() { tip.hidden = true; }

// Rounded-top bar path anchored to baseline (4px radius at data end)
function barPath(x, y, w, h, r = 4) {
  r = Math.min(r, h, w / 2);
  return `M${x},${y + h} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h} Z`;
}
function hBarPath(x, y, w, h, r = 4) {
  r = Math.min(r, w, h / 2);
  return `M${x},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x} Z`;
}
function wireHover(container, fmt) {
  container.querySelectorAll(".hit").forEach((h) => {
    const bar = container.querySelector(`.bar[data-i="${h.dataset.i}"]`);
    h.addEventListener("mouseenter", (e) => { bar.classList.add("hover"); showTip(e, fmt(+h.dataset.i)); });
    h.addEventListener("mousemove", moveTip);
    h.addEventListener("mouseleave", () => { bar.classList.remove("hover"); hideTip(); });
  });
}

// ---------- Chart 1: vertical bars (monthly savings) ----------
(function savingsChart() {
  const W = 520, H = 240, m = { t: 20, r: 8, b: 28, l: 40 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b, max = 500;
  const band = iw / monthlySavings.length, bw = band * 0.56;
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart of monthly client savings from April to September 2026, rising from 210 to 420 lakh rupees">`;
  for (let t = 0; t <= max; t += 100) {
    const y = m.t + ih - (t / max) * ih;
    svg += `<line class="grid-line" x1="${m.l}" x2="${W - m.r}" y1="${y}" y2="${y}"/><text class="axis-text" x="${m.l - 8}" y="${y + 4}" text-anchor="end">${t}</text>`;
  }
  monthlySavings.forEach((d, i) => {
    const h = (d.v / max) * ih, x = m.l + i * band + (band - bw) / 2, y = m.t + ih - h;
    svg += `<path class="bar" data-i="${i}" d="${barPath(x, y, bw, h)}"/>`;
    if (i === monthlySavings.length - 1) svg += `<text class="val-text" x="${x + bw / 2}" y="${y - 6}" text-anchor="middle">₹${d.v} L</text>`;
    svg += `<text class="axis-text" x="${x + bw / 2}" y="${H - 8}" text-anchor="middle">${d.m}</text>`;
    svg += `<rect class="hit" data-i="${i}" x="${m.l + i * band}" y="${m.t}" width="${band}" height="${ih}"/>`;
  });
  svg += `</svg>`;
  const el = $("#chart-savings");
  el.innerHTML = svg;
  wireHover(el, (i) => `<b>${monthlySavings[i].m} 2026</b> &middot; ₹${monthlySavings[i].v} lakh saved`);
})();

// ---------- Chart 2: horizontal bars (engagements by service) ----------
(function servicesChart() {
  const W = 420, rowH = 34, m = { t: 4, r: 30, b: 4, l: 150 };
  const H = m.t + m.b + rowH * serviceLines.length, iw = W - m.l - m.r;
  const max = Math.max(...serviceLines.map((d) => d.v));
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Horizontal bar chart of active engagements by service line; Transport and Freight leads with 7">`;
  serviceLines.forEach((d, i) => {
    const y = m.t + i * rowH, bh = 18, by = y + (rowH - bh) / 2, w = (d.v / max) * iw;
    svg += `<text class="axis-text" x="${m.l - 10}" y="${by + 13}" text-anchor="end" style="font-size:12px">${esc(d.s)}</text>`;
    svg += `<path class="bar" data-i="${i}" d="${hBarPath(m.l, by, w, bh)}"/>`;
    svg += `<text class="val-text" x="${m.l + w + 6}" y="${by + 13}">${d.v}</text>`;
    svg += `<rect class="hit" data-i="${i}" x="0" y="${y}" width="${W}" height="${rowH}"/>`;
  });
  svg += `</svg>`;
  const el = $("#chart-services");
  el.innerHTML = svg;
  wireHover(el, (i) => `<b>${esc(serviceLines[i].s)}</b> &middot; ${serviceLines[i].v} active projects`);
})();

// ---------- Dashboard filter: engagement status table ----------
function renderStatusTable(filter = "all") {
  const rows = projects
    .filter((p) => filter === "all" || p.status === filter)
    .map((p) => `
      <tr>
        <td><a href="#tracker" data-track="${p.id}">${p.id}</a></td>
        <td>${esc(p.client)}</td>
        <td>${esc(p.service)}</td>
        <td>${esc(p.consultant)}</td>
        <td class="num"><span class="mini-bar"><span style="width:${p.progress}%"></span></span>${p.progress}%</td>
        <td>${badge(p.status)}</td>
      </tr>`).join("");
  $("#status-table tbody").innerHTML = rows || `<tr><td colspan="6">No projects with this status.</td></tr>`;
}
renderStatusTable();
$("#status-filter").addEventListener("change", (e) => renderStatusTable(e.target.value));
// Dashboard -> Tracker hyperlink: clicking a project ID opens its tracking view
$("#status-table").addEventListener("click", (e) => {
  const a = e.target.closest("a[data-track]");
  if (!a) return;
  $("#project-id").value = a.dataset.track;
  trackProject(a.dataset.track);
});

// ---------- Enquiry form ----------
$("#enquiry-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `Name: ${f.get("name")}\nCompany: ${f.get("company")}\nEmail: ${f.get("email")}\nService: ${f.get("service")}\n\n${f.get("message")}`;
  const ref = "ENQ-" + Math.floor(1000 + Math.random() * 9000);
  $("#enquiry-msg").textContent = `Thank you, ${f.get("name")}! Your reference is ${ref}. Opening your email app to send the enquiry…`;
  window.location.href = `mailto:rishabh.sahu_mba25@gsv.ac.in?subject=${encodeURIComponent("Enquiry " + ref + " - " + f.get("service"))}&body=${encodeURIComponent(body)}`;
  e.target.reset();
});
