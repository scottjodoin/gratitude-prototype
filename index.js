let page = "start";
let $container = $("#container");
redirect("landing");

function redirectClicked(e){
  let pageName = $(e.target).attr("target");
  redirect(pageName);
}
function redirect(pageName){
  $.get({url:`${pageName}.html`, success:setContainer});
}

function setContainer(data){
  $container
    .html(data)
    .find("[target]").click(redirectClicked);
  containerFadeIn();
}

function containerFadeIn(){
  $container.hide();
  $container.fadein();
}