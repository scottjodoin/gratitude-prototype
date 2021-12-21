let page = "start";
let $container = $("#container");

let firstTime = _storage.getItem("goalsSettingFirstTime") === null;
if (firstTime) {
  $("#first-time-intro").removeClass("d-none");
  _storage.setItem("goalsSettingFirstTime", "true");
} else {
  $("#redirect").removeClass("d-none");
  $("#redirect a")[0].click();
}