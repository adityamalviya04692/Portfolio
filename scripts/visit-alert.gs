/**
 * Portfolio visit alert (Google Apps Script web app).
 * Emails the Google account that deploys it each time someone opens the portfolio.
 *
 * Setup: script.google.com > New project > paste this file > Deploy > New deployment >
 * type "Web app", Execute as "Me", Who has access "Anyone" > Deploy > copy the /exec URL.
 */
var CLARITY = "https://clarity.microsoft.com/projects/view/zb3t34gmiu/dashboard";

function doPost(e) {
  var v;
  try {
    v = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput("bad request");
  }
  var s = function (x) { return String(x || "").slice(0, 300); };
  var ua = s(v.ua);
  var device = /iPhone|Android.*Mobile|Mobile/i.test(ua) ? "Phone" : /iPad|Tablet|Android/i.test(ua) ? "Tablet" : "Computer";
  var source = v.ref ? "Tagged link: " + s(v.ref) : v.referrer ? s(v.referrer) : "Direct visit (typed URL or app with no referrer)";

  var body = [
    "Someone just opened your portfolio.",
    "",
    "When:       " + Utilities.formatDate(new Date(), "Asia/Kolkata", "dd MMM yyyy, hh:mm a") + " IST",
    "Came from:  " + source,
    "Page:       " + s(v.page),
    "Device:     " + device + " (" + s(v.screen) + ")",
    "Time zone:  " + s(v.tz),
    "Language:   " + s(v.lang),
    "Browser:    " + ua,
    "",
    "Watch the visit in Clarity (recordings appear within ~2 hours):",
    CLARITY,
  ].join("\n");

  MailApp.sendEmail(
    Session.getEffectiveUser().getEmail(),
    "Someone viewed your portfolio" + (v.ref ? " (via " + s(v.ref) + ")" : ""),
    body
  );
  return ContentService.createTextOutput("ok");
}
