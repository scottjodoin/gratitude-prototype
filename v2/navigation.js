let _searchParams = new URLSearchParams(location.search);
let _mainContainer = document.getElementById("main-container")
let _viewsContainer = document.getElementById("views-container");
let _fadeReadyFlag = false;
(function initNavigation(){
  showView();
})();

function showView(){
  landingPage = "landing";
  let loadTarget = _searchParams.get("view") || landingPage; // checks the url parameters
  softRedirect(loadTarget);
}

function softRedirect(target){
  let $view = $(`#${target}`);

  if ($view.length == 0)
    $view = $("#unimplemented");
  initView($view);
}

function initView($view){
  // if the view is being shown for the first time, append it and add interaction
  if ($view.hasClass("d-none")){
    $view.detach();
    $("#views-container").append($view);
    $view.removeClass("d-none")

    let fadeTimeAllowance = 800;
    // timeout to avoid glitchy scroll animations
    setTimeout(
      ()=>{
      $view
        .find("[target]")
        .click(targetRedirectClicked);
      },fadeTimeAllowance);
  }
  console.log($view); 
  $('#main-container').animate({
      scrollTop: $view[0].offsetTop
   }, 800);
}

function targetRedirectClicked(e){
  let target = $(e.target).attr("target") || "unimplemented";
  softRedirect(target)
}