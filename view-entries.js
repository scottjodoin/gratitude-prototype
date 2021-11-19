
var entryModal = new bootstrap.Modal(
  document.getElementById('entry-modal')
); // Returns a Bootstrap modal instance

const ctx = document.getElementById('chart');
const annoCanvas = document.getElementById('annotation');
const annoCtx = annoCanvas.getContext('2d');

function pointColor(context){
    var index = context.dataIndex;
   
    return data.weeks[week].dataPoints[index].mood.color;
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

const POINT_RADIUS = 20;
const POINT_HOVER_RADIUS = 25;
let week = 0;
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: data.weeks[week].dataPoints.map(e=>e.x),
    datasets: [{
      label: "Mood",
      fill: true,
      data: data.weeks[week].dataPoints,
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
          }
      }
    },
  },
  plugins: [{afterDraw: drawOnPoints}]  
});

function updateIcons (chart){
  //annoCtx.drawImage(emotionIcons[0], 0, 0);

  // console.log(chart.config);
  // chart.options.elements.point.pointStyle = emotionIcons["e01"];
  // chart.config._config.data.datasets[0].pointStyle = emotionIcons["e01"];
  // chart.options.elements.point.pointStyle = emotionIcons["e01"];
  // chart.config._config.data.datasets[0].data[0].pointStyle = emotionIcons["e01"];
  // chart.config.data.datasets[0]._meta[0].data[7]._model.pointStyle = emotionIcons["e01"];
}
function drawOnPoints(chart, args, options){
  annoCanvas.width = chart.width;
  annoCanvas.height = chart.height;

  let chartData = chart._metasets[0].data;
  
  for (i = 0; i < chartData.length; i++){
    let p = chartData[i];
    let stretchFactor = 2;
    let iconName = data.weeks[week].dataPoints[i].mood.icon;
    console.log(iconName);
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
    var clickedElementindex = activePoints[0].index;
    var label = chart.data.labels[clickedElementindex];
    var value = chart.data.datasets[clickedDatasetIndex].data[clickedElementindex];

    // update module
    let dateInfo = data.weeks[week].dataPoints[clickedElementindex];
    console.log(dateInfo);

    let d = new Date(dateInfo.date);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

    $("#entry-modal-title").text(`${mo} ${da}, ${ye}`);
    $("#entry-date").text(dateInfo.date);
    $("#entry-mood").attr("src", `img/${dateInfo.mood.icon}.svg`);
    $("#entry-mood-wrapper").css("background-color", dateInfo.mood.color);

    $("#entry-mood-text").text(dateInfo.mood.name);
    $("#entry-notes").val(dateInfo.entry);

    pointClicked(label,value);
  }
};

function pointClicked(label,value) {
  // alert("Clicked: " + label + " - " + value);
  entryModal.show();
}


// week button pressed
$("#btn-next-week").on("click", nextWeek);
$("#btn-prev-week").on("click", prevWeek);

function nextWeek() {
  if (week < data.weeks.length - 1) {
    week++;
    updateChart();
  }
}

function prevWeek() {
  if (week > 0) {
    week--;
    updateChart();
  }
}

function updateChart() {
  // update the chart
  let weekData = data.weeks[week];
  chart.data.labels = weekData.dataPoints.map(e=>e.x);
  chart.data.datasets[0].data = 
    weekData.dataPoints.map(e=>{return {x:e.x, y:e.y}});
  $("#week-title").text(weekData.weekTitle);

  chart.update();
}
