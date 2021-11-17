(function initEmotionChecklist() {
  let html = "";
  let emotionsByColor = {};

  // group emotions by color
  for (emotion of _emotion_data){
    let color = emotion.color;
    if (emotionsByColor[color] == undefined) {
      emotionsByColor[color] = [];
    }
    emotionsByColor[color].push(emotion);
  }

  // create html for each color
  html += "<div class='emotion-checklist-container d-flex'>";
  for (color in emotionsByColor){
    html += "<span class=me-4>";
    for (emotion of emotionsByColor[color]){
      let checkId = `emotion-check-${emotion.name.split(" ").join("-")}`;
      html += `<div class="emotion-checklist-item">
        <input type="checkbox" id=${checkId} name=${checkId} class="btn-check">
        <label  style="background-color:${emotion.color};"for="${checkId}" class="btn btn-primary-outline btn-square">
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