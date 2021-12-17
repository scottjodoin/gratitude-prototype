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
  html += "<div id='emotion-checklist-container'>";
  html += "<div class='row'>";

  for (cat in emotionsByCat) {
    html += "<div class='col emotion-cat-container'>";
    for (let i = 0; i < emotionsByCat[cat].length - 2; i += 3) {
      var emotion = emotionsByCat[cat][i];
      var emotion2 = emotionsByCat[cat][i + 1];
      var emotion3 = emotionsByCat[cat][i + 2];

      html += "<div class='float-start'>";

      let checkId = `emotion-check-${emotion.name.split(" ").join("-")}`;

      html += `<div class="me-3" id='emotion-checklist-item'>
        <input type="checkbox" id=${checkId} name=${checkId} class="btn-check">
        <label  style="background-color:${emotion.color};"for="${checkId}" class="my-3 btn btn-primary-outline btn-square">
          <img src="./img/${emotion.icon}.svg" width=40 height=40>
          <span class="text-center">${emotion.name}</span>
        </label>
      </div>`;

      checkId = `emotion-check-${emotion2.name.split(" ").join("-")}`;

      html += `</div><div class='float-start'><div class="me-3" id='emotion-checklist-item'>
        <input type="checkbox" id=${checkId} name=${checkId} class="btn-check">
        <label  style="background-color:${emotion2.color};"for="${checkId}" class="my-3 btn btn-primary-outline btn-square">
          <img src="./img/${emotion2.icon}.svg" width=40 height=40>
          <span class="text-center">${emotion2.name}</span>
        </label>
      </div>`;

      checkId = `emotion-check-${emotion3.name.split(" ").join("-")}`;

      html += `</div><div class='float-start'><div class="me-3" id='emotion-checklist-item'>
        <input type="checkbox" id=${checkId} name=${checkId} class="btn-check">
        <label  style="background-color:${emotion3.color};"for="${checkId}" class="my-3 btn btn-primary-outline btn-square">
          <img src="./img/${emotion3.icon}.svg" width=40 height=40>
          <span class="text-center">${emotion3.name}</span>
        </label>
      </div>`;

      html += "</div>";
    }
    html += "</div>";
  }
  html += "</div>";
  html += "</div>";
  $("emotion-checklist").html(html);
})();
