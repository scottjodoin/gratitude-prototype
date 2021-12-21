let _searchParams = new URLSearchParams(location.search);
let _currentViewId = null;
(function initNavigation() {
  showView();
})();

function isFirstTime() {
  if (_storage.getItem("visited") == null) {
    _storage.setItem("firstTime", true);
  }
  return _storage.getItem("visited") === null;
}

function setVisitedFlag() {
  _storage.setItem("visited", true);
}

function showView() {
  landingPage = isFirstTime() ? "welcome" : "landing"; // to test, clear localstorage in dev tools

  setVisitedFlag();

  let loadTarget = _searchParams.get("view") || landingPage; // checks the url parameters
  softRedirect(loadTarget);
}

function softRedirect(target) {
  $(".view").addClass("d-none");
  let $view = $(`#${target}`);

  // show unimplemented if the view query leads nowhere
  if ($view.length == 0) $view = $("#unimplemented");

  if ($view.length == 0) {
    console.warn("No '.view' elements on the page to display.");
    return; // this page does not have any views
  }
  _currentViewId = $view[0].id;

  // adjust the checkin button visibility

  // Removed to get active nav to work
  //$("#nav-checkin").toggleClass("invisible", $view.find("hide-checkin").length > 0);

  $view.removeClass("d-none");
}
