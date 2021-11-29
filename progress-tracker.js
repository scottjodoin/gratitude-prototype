$(".progress-tracker").each(function(i,e) {
  //<ul class="progress-tracker" progress="4/5"></ul>

  [position,count] = e.getAttribute("progress").split("/");
  for (i = 0; i < count; i++) {
    let isActive = (i < position) ? " is-active" : "";
    $(e).append(`<li class="progress-step${isActive}"><div class="progress-marker"></div></li>`);
  }
});