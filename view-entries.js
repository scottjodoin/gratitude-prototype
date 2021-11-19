/*
const FontAwesome = new FontFace("font-awesome",
    "url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css)");
var entryModal = new bootstrap.Modal(
  document.getElementById('entry-modal')
); // Returns a Bootstrap modal instance

document.fonts.add(FontAwesome); // add it to the document's FontFaceSet
*/
const ctx = document.getElementById('chart');

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
      backgroundColor: "rgba(192,75,192,0.4)",
      borderWidth: 5,
      borderColor: "rgba(75,192,192,1)",
      pointRadius: 10,
      pointHoverRadius: 15,
      pointBackgroundColor: function(context) {
        var index = context.dataIndex;
        var value = context.dataset.data[index].y;
        return value == 0 ? '#808080' :  // draw negative values in red
            value > 0 ? '#5daa68ff' :    // else, alternate values in blue and green
                '#cc5500';
      },
      pointBorderColor: function(context) {
        var index = context.dataIndex;
        var value = context.dataset.data[index].y;
        return value == 0 ? '#808080' :  // draw negative values in red
            value > 0 ? '#5daa68ff' :    // else, alternate values in blue and green
                '#cc5500';
      },
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
              font:{
                  family: "Font Awesome 6 Free",
              }
          }
      }
    },
  },
  plugins: [{
  }]
  
});

// clicking on the canvas
$(ctx).on("click", canvasClicked);
function canvasClicked(event) {
  var activePoints = chart.getElementAtEvent(event);

  // make sure click was on an actual point
  if (activePoints.length > 0) {
    var clickedDatasetIndex = activePoints[0]._datasetIndex;
    var clickedElementindex = activePoints[0]._index;
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
    $("#entry-date").val(dateInfo.date);
    $("#entry-mood").val(dateInfo.mood);
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
