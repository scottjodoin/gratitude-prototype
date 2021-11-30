(function initEmotionChecklist() {
  let html = "";
  let emotionsByCat = {};

  // group emotions by color
  for (emotion of _emotion_data) {
    let cat = emotion.category;
    if (emotionsByCat[cat] == undefined) {
      emotionsByCat[cat] = [];
    }
    emotionsByCat[cat].push(emotion);
  }

  // create html for each color
  html +=
    "<div class='container' id='emotion-checklist-container'>";
  for (cat in emotionsByCat) {
    html += "<div class='d-flex flex-wrap mb-5'>";
    for (emotion of emotionsByCat[cat]) {
      let checkId = `emotion-check-${emotion.name.split(" ").join("-")}`;

      html += `<div class="me-4" id='emotion-checklist-item'>
        <input type="checkbox" id=${checkId} name=${checkId} class="btn-check">
        <label  style="background-color:${emotion.color};"for="${checkId}" class="my-3 btn btn-primary-outline btn-square">
          <img src="./img/${emotion.icon}.svg" width=40 height=40>
          <span class="text-center">${emotion.name}</span>
        </label>
      </div>`;
    }
    html += "</div>";
  }
  html += "</div>";
  $("emotion-checklist").html(html);
})();
