if (_currentViewId==="goals-thankyou"){
  // TODO: add the summary using getRadioText(name of element) and getValue()
  // let radioValue

  let activitiesIntro="";
  let activities = "";
  let reminderIntro="";
  let reminder= "";
  let actiNum = 0;    //counts the number of elements that are true within the input

  for(let x of _state.inputs)
  {
    let v = x["viewId"];
    let t = x["text"];
    if(v == "goals-activities" && x["value"]==true) //activity
    {
      actiNum++;
      activities=activities+"<li>"+t+"</li>";
    }
    else if(v== "goals-checkin-freq") //check in reminder
    {
      reminder=reminder+"<li>"+t+"</li>";
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

  reminderIntro="Desired check in frequency:";
  let h = activitiesIntro+"<ul>"+activities+"</ul>"+reminderIntro+"<ul>"+reminder+"</ul>";
  $("#goal-summary").html(h);
}
