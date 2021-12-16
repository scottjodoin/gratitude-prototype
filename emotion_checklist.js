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
  html += "<div class='container' id='emotion-checklist-container'>";
  html += "<div class='row row-cols-2'>";

  console.log(emotionsByCat);
  for (cat in emotionsByCat) {
    html += "<div class='col'>";
    // html += "<div class='d-flex flex-wrap mb-5'>";
    for (emotion of emotionsByCat[cat]) {
      html += "<div class='row'><div class='col'>";

      let checkId = `emotion-check-${emotion.name.split(" ").join("-")}`;
      html += `<div class="me-4" id='emotion-checklist-item'>
        <input type="checkbox" id=${checkId} name=${checkId} class="btn-check">
        <label  style="background-color:${emotion.color};"for="${checkId}" class="my-3 btn btn-primary-outline btn-square">
          <img src="./img/${emotion.icon}.svg" width=40 height=40>
          <span class="text-center">${emotion.name}</span>
        </label>
      </div>`;

      html += "</div><div class='col'>";
      html += `<div class="me-4" id='emotion-checklist-item'>
        <input type="checkbox" id=${checkId} name=${checkId} class="btn-check">
        <label  style="background-color:${emotion.color};"for="${checkId}" class="my-3 btn btn-primary-outline btn-square">
          <img src="./img/${emotion.icon}.svg" width=40 height=40>
          <span class="text-center">${emotion.name}</span>
        </label>
      </div>`;

      html += "</div></div>";
    }
    // html += "</div>";
    html += "</div>";
  }
  html += "</div>";
  html += "</div>";
  $("emotion-checklist").html(html);
})();
