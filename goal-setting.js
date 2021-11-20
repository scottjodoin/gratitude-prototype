if (_currentViewId==="goals-thankyou"){
  // let radioValue

  let activitiesIntro="";
  let activities = "";
  let reminderIntro="";
  let reminder= "";
  let writereminderIntro="";
  let writereminder="";
  let actiNum = 0;    //counts the number of elements that are true within the input
  
  let actStorage = window.localStorage;
  let json = actStorage.getItem("actiNameStorage");
  let k = JSON.parse(json).customInputs;

  for(let x of _state.inputs)
  {
    let v = x["viewId"];
    let t = x["text"];
    if(v == "goals-activities" && x["value"]==true) //activity
    {
      actiNum++;
      activities=activities+"<li>"+t+"</li>";
    }
    else if(v== "goals-checkin-freq" && t.length > 0) //check in reminder
    {
      reminder=reminder+"<li>"+t+"</li>";
    }
    else if(v== "goals-write-freq" && t.length > 0)
    {
      writereminder=writereminder+"<li>"+t+"</li>";
    }
  }

  for(let x of k)
  {
    if(x.value === true)
    {
      actiNum++;
      activities=activities+"<li>"+x.name+"</li>";
    }
  }


  if(actiNum>0)
  {
    if(actiNum==1)
    {
      activitiesIntro="Activity";
    }
    else
    {
      activitiesIntro="Activities";
    }
    activitiesIntro+=" chosen to track:";
  }

  if(reminder.length>0)
  reminderIntro="Desired frequency for checking in:";
  if(writereminder.length>0)
  writereminderIntro="Desired frequency for writing about your emotions:";
  let h = activitiesIntro+"<ul>"+activities+"</ul>"+reminderIntro+"<ul>"+reminder+"</ul>"+writereminderIntro+"<ul>"+writereminder+"</ul>";
  $("#goal-summary").html(h);
}

if (_currentViewId === "goals-try-firsttime"){
  $("#nav-checkin")
    .parent()
    .append("<div class=arrow-point-up-anchor><div></div></div>");
}

// console.log(_state.inputs);
// console.log(_state.inputs.length);

$("#acti-add-button").click(ActiAddpop);
$("#Acti-Cancel").click(ActiCancel);
// $("#Acti-Done").click(ActiDone);

function ActiCancel()
{
  // alert("Cancel clicked");
  document.querySelector('.acti-add').style.display='none';
}

function ActiAddpop()
{
  // alert("add clicked");
  document.querySelector('.acti-add').style.display='flex';
}

const ActiInput = document.getElementById('AddActiInput');
const Aform = document.getElementById('AddActiForm');
const errorOutput = document.getElementById('ErrorMsg');
let actStorage = window.localStorage;
Aform.addEventListener('submit', 
function (e){
 
  let msg = [];
  let pass=true;
  let inputText = ActiInput.value;
  if(inputText === '' || inputText == null)
  {
    msg.push("Activity name is required");
    pass=false;
  }
  let a = document.querySelectorAll('[id^="act-"]');

  if(pass)
  {
    if(inputText.length > 25)
    {
      msg.push("Activity name is too long (must be less than 25 characters)");
      pass=false;
    }
  }
  if(pass)
  {
    inputText = inputText.trim();
    for(let n of a)
    {
      let i = n["id"].split('-');
      let x = "";
      for(let j of i)
      {
        if(j!='act')
        {
          x+=j+" ";
        }
      }
      x=x.trim();
      // console.log(x)
      
      if(inputText.toLowerCase()===x.toLowerCase())
      {
        msg.push("Activity name is already in use");
        pass=false;
      }
    }
  }

  errorOutput.innerText = msg.join();

  if(pass)
  {
    let json = actStorage.getItem("actiNameStorage");
    if(json==null)
    {
      let newthing = {customInputs:[]}
      actStorage.setItem("actiNameStorage",JSON.stringify(newthing));
      json = actStorage.getItem("actiNameStorage");
    }

    let j = inputText.replaceAll(" ","-");
    let id = "act-"+j;
    let dataparse = {name: inputText,id: id,  value: false};
    let k = JSON.parse(json).customInputs;

    k.push(dataparse);
    let js = JSON.stringify({customInputs:k});
    actStorage.setItem("actiNameStorage",js);

    document.querySelector('.acti-add').style.display='none';
    let l = "<div id="+id+"-div><input type=\"checkbox\" class=\"btn-check\" id="+id+" autocomplete=\"off\">"+
    "<label class=\"CustomActiLeft btn btn-outline-primary me-2\" for="+id+">"+inputText+"<i class=\"ms-2 fas fa-seedling\"></i></label>"+
    "<button onclick=\"deleteActivity('"+id+"-div')\" class=\"actiRemoveButton CustomActiRight btn btn-outline-secondary me-2\"><i class=\"fas fa-times\"></i></button> </div>";
    $("#addAfterThis").after(l);
    $(`#${id}`).change(customActivityClicked);
  }
  e.preventDefault();
});


function deleteActivity(e)
{
  let div = $(`#${e}`);
  let id = div.find("input")[0].id;
  let json = actStorage.getItem("actiNameStorage");
  let customInputs = JSON.parse(json).customInputs.filter(x => x.id!=id);
  let js = JSON.stringify({customInputs:customInputs});
  actStorage.setItem("actiNameStorage",js);

  div.remove();
  // alert("swsw");
}