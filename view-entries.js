
var entryModal = new bootstrap.Modal(
  document.getElementById('entry-modal')
); // Returns a Bootstrap modal instance

const ctx = document.getElementById('chart');
const annoCanvas = document.getElementById('annotation');
const annoCtx = annoCanvas.getContext('2d');
let _entryIndex = 0; // the index of the entry of the day
let _clickedElementindex = 0;

$("#btn-prev-entry").click(btnPrevEntryClicked);
$("#btn-next-entry").click(btnNextEntryClicked);

initPage();
function initPage() {
  $("#activity-select")
  .html(
    Object.keys(_activities).map(e => {
      return `<option value="${e}">${_activities[e]}</option>`;
    }).join("")
  )

  $("#activity-select").change(activitySelectChanged);
  setTimeout(activitySelectChanged,100); // data needs to be generated first.
}

function activitySelectChanged(e){
  let activity = $("#activity-select").val();

  // get activity by date
  let activityByDate = {};
  for (w of data.weeks){
    for (dataPoint of w.dataPoints){
      if (dataPoint.activities.includes(activity)){
        if (!(dataPoint.date in activityByDate)){
          activityByDate[dataPoint.date] = [];
        }
        //console.log(activityByDate,dataPoint.date, activityByDate[dataPoint.date]);
        activityByDate[dataPoint.date] = dataPoint;
      }
    }
  }

  $("#activity-calendar tbody td").each(function(index, element){
    let date = $(element).children("div").attr("date");
    let onDate = date in activityByDate;
    console.log(activityByDate);
    $(element).toggleClass("activity-success",onDate);
    
  });
}
function pointColor(context){
    var index = context.dataIndex;

    return context.raw.mood[0].color;
    // var value = context.dataset.data[index].y;
    // return value == 0 ? '#808080' : // draw 0 in grey 
    //     value > 0 ? '#5daa68ff' : // positive in green 
    //         '#cc5500'; // negative in red
}
let emotionIcons = {};

for (i =0 ; i < 25; i++){
  let iconName = "e"+pad(i+1,2);
  let img = new Image(100, 100);
  img.src = `./img/${iconName}.svg`;

  emotionIcons[iconName] = img;
}

function pad(num, size) {
  var s = "000000000" + num;
  return s.substr(s.length-size);
}

var groupBy = function(xs, key) {
  // https://stackoverflow.com/a/34890276/13289307
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

function getDataPointsByDate(weekIndex){
  let dict =  groupBy(data.weeks[weekIndex].dataPoints,"x"); // get grouped data points by x
  return Object.values(dict);
}

const POINT_RADIUS = 20;
const POINT_HOVER_RADIUS = 25;
let week = 0;
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: getDataPointsByDate(week).map(e=>e[0].x), // show the first of each group
    datasets: [{
      label: "Mood",
      fill: true,
      data: getDataPointsByDate(week).map(e=>e[0]),
      tension: 0.1,
      
      borderWidth: 3,
      borderColor: "#808080",
      pointRadius: POINT_RADIUS,
      pointHoverRadius: POINT_HOVER_RADIUS,
      pointBackgroundColor: pointColor,
      pointBorderColor: pointColor, 
      pointStyle: emotionIcons[0]
    }]
  },

  options: {
    maintainAspectRatio: false,
    responsive: true,
    transitions: {
        hide: {
            duration: 0
        }
    },
    scales: {
      y:{
          suggestedMin: -6,
          suggestedMax: 6,
          ticks:{
              display: false
          }
      }
    },
    onClick: canvasClicked,
    plugins: {
        tooltip: {enabled: false},
        legend: {display: false},
    }
  },
  plugins: [
      {afterDraw: drawOnPoints}, 
  ]  
});

drawWeekButtons();
function drawOnPoints(chart, args, options){
  annoCanvas.width = chart.width;
  annoCanvas.height = chart.height;

  let chartData = chart._metasets[0].data;
  
  for (i = 0; i < chartData.length; i++){
    let p = chartData[i];
    let stretchFactor = 2;
    let iconName = p.$context.raw.mood[0].icon

    let img = emotionIcons[iconName];
    if (!img) continue;
    annoCtx.drawImage(img, p.x - POINT_RADIUS*stretchFactor/2, p.y - POINT_RADIUS*stretchFactor/2, POINT_RADIUS * stretchFactor, POINT_RADIUS * stretchFactor);
  }
}

// clicking on the canvas
$(ctx).on("click", canvasClicked);
function canvasClicked(event) {
  var activePoints = chart.getElementsAtEventForMode(event, 'nearest', {intersect: true}, false);

  // make sure click was on an actual point
  if (activePoints.length > 0) {
    var clickedDatasetIndex = activePoints[0].datasetIndex;
    _clickedElementindex = activePoints[0].index;
    var label = chart.data.labels[_clickedElementindex];
    var value = chart.data.datasets[clickedDatasetIndex].data[_clickedElementindex];

    // update module
    _entryIndex = 0;
    updateModal();


    pointClicked(label,value);
  }
};

function btnPrevEntryClicked(e){
  let count = getDataPointsByDate(week)[_clickedElementindex].length;
  if (_entryIndex > 0){
    _entryIndex--;
    $("#entry-index-label").text((_entryIndex+1)+"/"+count);

    updateModal();
  }
}

function btnNextEntryClicked(e) {
  let count = getDataPointsByDate(week)[_clickedElementindex].length;
  if (_entryIndex < count-1){
    _entryIndex++;
    $("#entry-index-label").text((_entryIndex+1)+"/"+count);
    updateModal();
  }
}

function updateModal(){
  
  let preparedData = getDataPointsByDate(week)[_clickedElementindex];
  let dateInfo = preparedData[_entryIndex];

  let entryCount = preparedData.length;
  $("#entry-nav-container").toggleClass("disabled",entryCount < 2);
  $("#entry-index-label").text((_entryIndex+1)+"/"+entryCount);
  $("#btn-prev-entry").toggleClass("disabled", _entryIndex == 0);
  $("#btn-next-entry").toggleClass("disabled", _entryIndex == entryCount-1);

  let formattedDate = dateInfo.date + "T00:00:00.000-06:00"

  let d = new Date(formattedDate);
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

  $("#entry-modal-title").text(`${mo} ${da}, ${ye}`);
  $("#entry-date").text(dateInfo.date);
  

  // add the activities
  $("#entry-activity-container").html(
      dateInfo.activities
        .map(e=>`<span class='btn me-3 my-1 rounded pe-none btn-success'>${_activities[e]}</span>`)
        .join("") || "<span>None</span>"
    );

  // add the moods
  $("#entry-mood-container").empty();
  for (i in dateInfo.mood){
    let mood = dateInfo.mood[i];

    let moodHtml = `<div class="btn-square me-2" style="zoom:0.75;background-color:${mood.color};">
      <img class="entry-mood" src="img/${mood.icon}.svg" alt="">
      <span class=entry-mood-text>${mood.name}</span>
    </div>`;

    $("#entry-mood-container").append(moodHtml);
  }

  $("#entry-notes").val(dateInfo.entry);
}

function pointClicked(label,value) {
  entryModal.show();
}


// week button pressed
$("#btn-next-week").on("click", nextWeek);
$("#btn-prev-week").on("click", prevWeek);

function drawWeekButtons(){
    (week == data.weeks.length - 1) ?  document.getElementById("btn-next-week").style.visibility = 'hidden' : document.getElementById("btn-next-week").style.visibility = 'visible';
    (week == 0) ? document.getElementById("btn-prev-week").style.visibility = 'hidden' : document.getElementById("btn-prev-week").style.visibility = 'visible';
}

function nextWeek(e) {
  if (week < data.weeks.length - 1) {
    week++;
    updateChart();
    drawWeekButtons();
  }

}

function prevWeek(e) {
  if (week > 0) {
    week--;
    updateChart();
    drawWeekButtons();
  }
}

function updateChart() {
  // update the chart
  let weekData = data.weeks[week];
  let firstDataPoints = getDataPointsByDate(week).map(e=>e[0])
  chart.data.labels = firstDataPoints.map(e=>e.x)
  chart.data.datasets[0].data = firstDataPoints;
  $("#week-title").text(weekData.weekTitle);

  chart.update();
}
