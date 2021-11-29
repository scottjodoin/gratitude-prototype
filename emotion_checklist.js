(function initEmotionChecklist() {
  let html = "";
  let emotionsByCat = {};

  // group emotions by color
  for (emotion of _emotion_data){
    let cat = emotion.category;
    if (emotionsByCat[cat] == undefined) {
      emotionsByCat[cat] = [];
    }
    emotionsByCat[cat].push(emotion);
  }

  // create html for each color
  html += "<div class='container d-flex flex-wrap' id='emotion-checklist-container'>";
  for (cat in emotionsByCat){
    html += "<span class=row row-cols-7>";
    //html += "<h4 class='emotion-checklist-header text-center mb-1'>" + emotionsByCat[cat][0].category + "</h4>";
    for (emotion of emotionsByCat[cat]){
      let checkId = `emotion-check-${emotion.name.split(" ").join("-")}`;
      html += `<div class="col me-4" id='emotion-checklist-item'>
        <input type="checkbox" id=${checkId} name=${checkId} class="btn-check">
        <label  style="background-color:${emotion.color};"for="${checkId}" class="my-4 btn btn-primary-outline btn-square">
          <img src="./img/${emotion.icon}.svg" width=40 height=40>
          <span class="text-center">${emotion.name}</span>
        </label>
      </div>`;  
    }
    html+= "</span>";
  }
  html += "</div>";
  $("emotion-checklist").html(html);
})();