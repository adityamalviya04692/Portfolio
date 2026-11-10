/**
 * Portfolio analytics — Google Apps Script web app.
 *   doPost : logs each visit to the script's own storage, and (optionally) emails an alert.
 *   doGet  : renders a private live dashboard of the logged visits.
 *
 * All data stays in your Google account's Script Properties — no spreadsheet, no API keys.
 *
 * TO UPDATE AN EXISTING DEPLOYMENT (keeps the same /exec URL the site already calls):
 *   script.google.com > open your project > paste this whole file over the old code > Save.
 *   Deploy > Manage deployments > pencil/edit > Version: "New version" > Deploy.
 *   The first redeploy re-asks for permission — click Allow.
 *
 * TO OPEN THE DASHBOARD: use https://adityamalviya04692.github.io/Portfolio/dashboard.html
 *   and enter your DASH_KEY when asked. (The key is NOT stored in this repo.)
 *   (use the Google account that owns the script, or an Incognito window).
 */

var EMAIL_ALERTS = true;            // set to false to stop the per-visit emails (dashboard keeps working)
var DASH_KEY     = "SET-YOUR-OWN-KEY";  // placeholder: set a private key in Apps Script only, never commit it
var CLARITY      = "https://clarity.microsoft.com/projects/view/zb3t34gmiu/dashboard";
var SITE         = "https://adityamalviya04692.github.io/Portfolio/";
var REPO         = "https://github.com/adityamalviya04692/Portfolio";
var ACTIONS      = "https://github.com/adityamalviya04692/Portfolio/actions";
var TZ           = "Asia/Kolkata";

/* ---------- storage ---------- */
function _load() {
  var raw = PropertiesService.getScriptProperties().getProperty("stats");
  return raw ? JSON.parse(raw) : {};
}
function _save(s) {
  PropertiesService.getScriptProperties().setProperty("stats", JSON.stringify(s));
}
function _trimDays(s) {
  var keep = {}, now = new Date();
  for (var i = 0; i < 120; i++) {
    var d = new Date(now.getTime() - i * 86400000);
    var k = Utilities.formatDate(d, TZ, "yyyy-MM-dd");
    if (s.days[k] != null) keep[k] = s.days[k];
  }
  s.days = keep;
}
function _host(u) {
  try { return String(u).split("/")[2] || "direct"; } catch (e) { return "direct"; }
}

/* ---------- record a visit ---------- */
function doPost(e) {
  var v;
  try { v = JSON.parse(e.postData.contents); } catch (err) { return _text("bad request"); }

  var lock = LockService.getScriptLock();
  try { lock.waitLock(5000); } catch (err) {}
  try {
    var s = _load();
    var now = new Date();
    var day = Utilities.formatDate(now, TZ, "yyyy-MM-dd");
    var ua = String(v.ua || "").slice(0, 180);
    var device = /iPhone|Android.*Mobile|Mobile/i.test(ua) ? "Phone"
               : /iPad|Tablet|Android/i.test(ua) ? "Tablet" : "Computer";
    var ref = v.ref ? String(v.ref).slice(0, 40) : "";
    var source = ref ? ref : (v.referrer ? _host(v.referrer) : "direct");

    s.total   = (s.total || 0) + 1;
    s.days    = s.days    || {}; s.days[day]       = (s.days[day] || 0) + 1;
    s.refs    = s.refs    || {}; s.refs[ref || "(none)"] = (s.refs[ref || "(none)"] || 0) + 1;
    s.devices = s.devices || {}; s.devices[device] = (s.devices[device] || 0) + 1;
    s.sources = s.sources || {}; s.sources[source] = (s.sources[source] || 0) + 1;
    s.recent  = s.recent  || [];
    s.recent.unshift({ t: now.getTime(), s: source, d: device, p: String(v.page || "").slice(0, 60) });
    s.recent = s.recent.slice(0, 30);

    _trimDays(s);
    _save(s);
    if (EMAIL_ALERTS) _email(v, source, device, ua, now);
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
  return _text("ok");
}

function _email(v, source, device, ua, now) {
  var body = [
    "Someone just opened your portfolio.",
    "",
    "When:       " + Utilities.formatDate(now, TZ, "dd MMM yyyy, hh:mm a") + " IST",
    "Came from:  " + source,
    "Page:       " + String(v.page || ""),
    "Device:     " + device + " (" + String(v.screen || "") + ")",
    "Browser:    " + ua,
    "",
    "Dashboard:  open your web app URL with ?key=" + DASH_KEY,
    "Clarity:    " + CLARITY
  ].join("\n");
  MailApp.sendEmail(
    Session.getEffectiveUser().getEmail(),
    "Someone viewed your portfolio" + (v.ref ? " (via " + String(v.ref).slice(0, 40) + ")" : ""),
    body
  );
}

/* ---------- dashboard ---------- */
function doGet(e) {
  if (e && e.parameter && e.parameter.format === "json") {
    var ok = e.parameter.key === DASH_KEY;
    return ContentService.createTextOutput(JSON.stringify(ok ? _load() : { error: "bad key" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  if (!e || !e.parameter || e.parameter.key !== DASH_KEY) {
    return HtmlService.createHtmlOutput(
      "<div style='font:15px system-ui;padding:40px;color:#333'>Add <b>?key=" +
      "&lt;your key&gt;</b> to the URL to open the dashboard.</div>"
    ).setTitle("Portfolio Analytics");
  }
  var s = _load();
  return HtmlService.createHtmlOutput(_dashboardHtml(s))
    .setTitle("Portfolio Analytics")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

function _sum(days, n) {
  var t = 0, now = new Date();
  for (var i = 0; i < n; i++) {
    var k = Utilities.formatDate(new Date(now.getTime() - i * 86400000), TZ, "yyyy-MM-dd");
    t += (days[k] || 0);
  }
  return t;
}
function _esc(x) {
  return String(x == null ? "" : x).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}
function _bars(days) {
  var now = new Date(), vals = [], labels = [], max = 1;
  for (var i = 13; i >= 0; i--) {
    var d = new Date(now.getTime() - i * 86400000);
    var k = Utilities.formatDate(d, TZ, "yyyy-MM-dd");
    var n = days[k] || 0;
    vals.push(n); labels.push(Utilities.formatDate(d, TZ, "dd/MM")); if (n > max) max = n;
  }
  var out = "";
  for (var j = 0; j < vals.length; j++) {
    var h = Math.round((vals[j] / max) * 100);
    var today = j === vals.length - 1;
    out += "<div class='col'><div class='barwrap'><div class='bar" + (today ? " today" : "") +
      "' style='height:" + (vals[j] ? Math.max(h, 4) : 0) + "%'></div></div>" +
      "<div class='bn'>" + vals[j] + "</div><div class='bl'>" + labels[j] + "</div></div>";
  }
  return out;
}
function _rows(obj, accent) {
  var arr = [];
  for (var k in obj) arr.push([k, obj[k]]);
  arr.sort(function (a, b) { return b[1] - a[1]; });
  if (!arr.length) return "<div class='empty'>No data yet.</div>";
  var max = arr[0][1] || 1, out = "";
  for (var i = 0; i < arr.length && i < 8; i++) {
    var w = Math.max(Math.round((arr[i][1] / max) * 100), 6);
    out += "<div class='rrow'><div class='rk'>" + _esc(arr[i][0]) + "</div>" +
      "<div class='rtrack'><div class='rfill' style='width:" + w + "%;background:" + accent + "'></div></div>" +
      "<div class='rv'>" + arr[i][1] + "</div></div>";
  }
  return out;
}
function _recent(recent) {
  if (!recent || !recent.length) return "<div class='empty'>No visits logged yet.</div>";
  var out = "";
  for (var i = 0; i < recent.length; i++) {
    var r = recent[i];
    var when = Utilities.formatDate(new Date(r.t), TZ, "dd MMM, hh:mm a");
    out += "<tr><td>" + _esc(when) + "</td><td><span class='pill'>" + _esc(r.s) +
      "</span></td><td>" + _esc(r.d) + "</td></tr>";
  }
  return out;
}

function _dashboardHtml(s) {
  s = s || {};
  var days = s.days || {};
  var total = s.total || 0;
  var d7 = _sum(days, 7), d30 = _sum(days, 30);
  var today = days[Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd")] || 0;
  var updated = Utilities.formatDate(new Date(), TZ, "dd MMM yyyy, hh:mm a") + " IST";

  var tags = [
    ["LinkedIn", SITE + "?ref=linkedin"],
    ["Naukri", SITE + "?ref=naukri"],
    ["Resume PDF", SITE + "?ref=resume"],
    ["Instahyre", SITE + "?ref=instahyre"]
  ];
  var tagHtml = "";
  for (var i = 0; i < tags.length; i++) {
    tagHtml += "<div class='taglink'><div class='tl'><b>" + tags[i][0] + "</b><code>" +
      _esc(tags[i][1]) + "</code></div><button class='copy' data-u='" + _esc(tags[i][1]) +
      "'>Copy</button></div>";
  }

  return "" +
"<!doctype html><html><head><meta charset='utf-8'><style>" +
":root{--bg:#15171c;--panel:#1d2026;--panel2:#232730;--line:#2b2f38;--fg:#eceef2;--muted:#9aa0aa;--blue:#2f6bff;--orange:#ff7a1a}" +
"*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 -apple-system,Segoe UI,Roboto,system-ui,sans-serif}" +
".wrap{max-width:960px;margin:0 auto;padding:24px 18px 48px}" +
"header{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:baseline;justify-content:space-between;border-bottom:1px solid var(--line);padding-bottom:16px}" +
"h1{margin:0;font-size:22px;letter-spacing:.2px}h1 span{color:var(--orange)}" +
".sub{color:var(--muted);font-size:12.5px}" +
".grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:18px 0}" +
"@media(max-width:620px){.grid{grid-template-columns:repeat(2,1fr)}}" +
".kpi{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px}" +
".kpi .n{font-size:30px;font-weight:700;font-variant-numeric:tabular-nums;line-height:1.1}" +
".kpi .l{color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.6px;margin-top:6px}" +
".kpi.blue .n{color:var(--blue)}.kpi.orange .n{color:var(--orange)}" +
".card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:18px;margin:14px 0}" +
".card h2{margin:0 0 14px;font-size:13px;text-transform:uppercase;letter-spacing:.7px;color:var(--muted)}" +
".chart{display:flex;align-items:flex-end;gap:6px;height:150px}" +
".col{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0}" +
".barwrap{width:100%;height:110px;display:flex;align-items:flex-end;justify-content:center}" +
".bar{width:70%;background:var(--blue);border-radius:4px 4px 0 0;min-height:2px}" +
".bar.today{background:var(--orange)}" +
".bn{font-size:11px;color:var(--fg);font-variant-numeric:tabular-nums}.bl{font-size:10px;color:var(--muted)}" +
".cols{display:grid;grid-template-columns:1fr 1fr;gap:14px}@media(max-width:620px){.cols{grid-template-columns:1fr}}" +
".rrow{display:flex;align-items:center;gap:10px;margin:8px 0}" +
".rk{width:34%;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
".rtrack{flex:1;background:var(--panel2);border-radius:6px;height:10px;overflow:hidden}" +
".rfill{height:100%;border-radius:6px}.rv{width:38px;text-align:right;font-variant-numeric:tabular-nums;color:var(--muted);font-size:13px}" +
"table{width:100%;border-collapse:collapse;font-size:13px}td,th{text-align:left;padding:8px 6px;border-bottom:1px solid var(--line)}" +
"th{color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:.5px}" +
".pill{background:rgba(47,107,255,.16);color:#9dbbff;border-radius:20px;padding:2px 9px;font-size:12px}" +
".links{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}@media(max-width:620px){.links{grid-template-columns:1fr}}" +
".lnk{display:block;background:var(--panel2);border:1px solid var(--line);border-radius:10px;padding:13px 14px;color:var(--fg);text-decoration:none}" +
".lnk:hover{border-color:var(--blue)}.lnk b{display:block}.lnk small{color:var(--muted)}" +
".taglink{display:flex;align-items:center;gap:10px;background:var(--panel2);border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin:8px 0}" +
".tl{min-width:0;flex:1}.tl code{display:block;color:var(--muted);font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
".copy{background:var(--orange);color:#1a1205;border:0;border-radius:8px;padding:8px 12px;font-weight:600;cursor:pointer;flex:none}" +
".copy.done{background:var(--blue);color:#fff}" +
".empty{color:var(--muted);font-size:13px;padding:6px 0}" +
".foot{color:var(--muted);font-size:12px;margin-top:22px;text-align:center}" +
"</style></head><body><div class='wrap'>" +
"<header><div><h1>Portfolio <span>Analytics</span></h1><div class='sub'>Updated " + updated + "</div></div>" +
"<a class='lnk' style='padding:8px 12px' href='" + SITE + "' target='_blank'><b>View live site ↗</b></a></header>" +

"<div class='grid'>" +
"<div class='kpi orange'><div class='n'>" + total + "</div><div class='l'>Total visits</div></div>" +
"<div class='kpi blue'><div class='n'>" + d7 + "</div><div class='l'>Last 7 days</div></div>" +
"<div class='kpi'><div class='n'>" + d30 + "</div><div class='l'>Last 30 days</div></div>" +
"<div class='kpi'><div class='n'>" + today + "</div><div class='l'>Today</div></div></div>" +

"<div class='card'><h2>Visits — last 14 days</h2><div class='chart'>" + _bars(days) + "</div></div>" +

"<div class='cols'>" +
"<div class='card'><h2>Where visitors came from</h2>" + _rows(s.sources || {}, "var(--blue)") + "</div>" +
"<div class='card'><h2>Devices</h2>" + _rows(s.devices || {}, "var(--orange)") + "</div></div>" +

"<div class='card'><h2>Recent visits</h2><table><thead><tr><th>When</th><th>Source</th><th>Device</th></tr></thead>" +
"<tbody>" + _recent(s.recent) + "</tbody></table></div>" +

"<div class='card'><h2>Quick links</h2><div class='links'>" +
"<a class='lnk' href='" + CLARITY + "' target='_blank'><b>Microsoft Clarity ↗</b><small>Recordings, heatmaps, full stats</small></a>" +
"<a class='lnk' href='" + SITE + "' target='_blank'><b>Live portfolio ↗</b><small>adityamalviya04692.github.io</small></a>" +
"<a class='lnk' href='" + REPO + "' target='_blank'><b>GitHub repo ↗</b><small>Source code</small></a>" +
"<a class='lnk' href='" + ACTIONS + "' target='_blank'><b>Deploy status ↗</b><small>GitHub Actions builds</small></a>" +
"</div></div>" +

"<div class='card'><h2>Tagged links to share</h2>" + tagHtml + "</div>" +

"<div class='foot'>Live from your Apps Script. Visitor identity is never collected — the <code>?ref=</code> tag is how you know who shared it.</div>" +
"</div>" +
"<script>document.querySelectorAll('.copy').forEach(function(b){b.onclick=function(){" +
"navigator.clipboard.writeText(b.getAttribute('data-u')).then(function(){b.textContent='Copied';b.classList.add('done');" +
"setTimeout(function(){b.textContent='Copy';b.classList.remove('done')},1400)})}})<\/script>" +
"</body></html>";
}

/* ---------- util ---------- */
function _text(msg) {
  return ContentService.createTextOutput(msg);
}
