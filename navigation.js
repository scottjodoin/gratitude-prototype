let _searchParams = new URLSearchParams(location.search);

(function initNavigation(){
  showView();
})();

function showView(){
  landingPage = "landing";
  let loadTarget = _searchParams.get("view") || landingPage; // checks the url parameters
  softRedirect(loadTarget);
}

function softRedirect(target){
  $(".view").addClass("d-none");
  let $view = $(`#${target}`);

  if ($view.length == 0)
    $view = $("#unimplemented");
  
    $view.removeClass("d-none");
}