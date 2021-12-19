if (_currentViewId === "goals-activities")
{
    let json = _storage.getItem("actiNameStorage");
    if(json != null)
    {
        json = JSON.parse(json).customInputs;
        for(let n of json)
        {
            let id = n.id;
            let isChecked = (n.value == true) ? "checked" : "";
            // console.log(isChecked, n);
            let l = "<div id="+id+"-div><input type=checkbox class=\"btn-check modal-input\" id="+id+" autocomplete=\"off\" " + isChecked + ">"+
            "<label class=\"CustomActiLeft btn btn-outline-primary me-2 buttonsMargin\" for="+id+">"+n.name+"<i class=\"ms-2 fas fa-seedling\"></i></label>"+
            "<button onclick=\"deleteActivity('"+id+"-div')\" class=\"actiRemoveButton CustomActiRight btn btn-outline-secondary me-2\"><i class=\"fas fa-times\"></i></button> </div>";
            $("#addAfterThis").after(l);
            $(`#${id}`).change(customActivityClicked);
        }
    }
}

function customActivityClicked(e){
  // update the storage
  let value = e.target.checked;
  let id = $(e.target)[0].id;

  let json = JSON.parse(_storage.getItem("actiNameStorage"));
  if(json == null) return;

  let customInput = json.customInputs.find(x => x.id === id);
  if (customInput == null) return;
  customInput.value = value;
  _storage.setItem("actiNameStorage", JSON.stringify(json));
}

let activities;

if(_currentViewId === "goals-activities-day")
{
    actiList();
}

function actiList()
{
    let actStorage = window.localStorage;
    let json = actStorage.getItem("actiNameStorage");
    let k;
    let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    let id;
    activities="";
    let listId = [];
    let jsonstore = actStorage.getItem("actiDayChosen");
    if(jsonstore==null)
    {
      let newthing = {customDays:[]}
      actStorage.setItem("actiDayChosen",JSON.stringify(newthing));
      jsonstore = actStorage.getItem("actiDayChosen");
    }
    let list = JSON.parse(jsonstore).customDays;
    let activitiesIntro="<table class=\"actitable\">";
    for(let x of _state.inputs)
    {
        let v = x["viewId"];
        let t = x["text"];
        let html = x["html"];

        if(v == "goals-activities" && x["value"]==true) //activity
        {
            let name= t.replaceAll(" ","-");
            let dayButtons="";
            for(let i of days)
            {
                id="act-day-"+name+i;
                let isChecked;
                let inList = false;
                for(let n of list)
                {
                    if(id === n.id)
                    {
                        inList=true;
                        break;
                    }
                }
                
                if(inList == false)
                {
                    let dataparse = {name: t, html: html, day: i,id: id,  value: true};
                    list.push(dataparse);
                    let js = JSON.stringify({customDays:list});
                    actStorage.setItem("actiDayChosen",js);
                }
                let jspar = JSON.parse(actStorage.getItem("actiDayChosen")).customDays;
                for(let n of jspar)
                {
                    if(id === n.id)
                    {
                        isChecked = (n.value == true) ? "checked" : "";
                        break;
                    }
                }

                let thisday = "<input type=\"checkbox\" class=\"btn-check\" id="+id+" autocomplete=\"off\" "+isChecked+">"+
                "<label class=\"btn btn-outline-primary me-2 buttonsMargin\" for="+id+">"+i+"</label>";
                dayButtons=dayButtons+thisday;
                listId.push(id);
            }
            // let werk = "<tr><td class=\"actirows\">"+t+"</td><td>"+dayButtons+"</td></tr>";
            activities=activities+"<tr><td class=\"actirows\">"+html+"</td><td>"+dayButtons+"</td></tr>";
        }
    }

    if(json!=null)
    {
        k= JSON.parse(json).customInputs;
        for(let x of k)
        {
            let name= x.name.replaceAll(" ","-");
            if(x.value === true)
            {
                
                let dayButtons="";
                for(let i of days)
                {
                    id="act-day-"+name+"-"+i;
                    
                    let isChecked;
                    let inList = false;
                    for(let n of list)
                    {
                        if(id === n.id)
                        {
                            inList=true;
                            break;
                        }
                    }
                    
                    if(inList == false)
                    {
                        let dataparse = {name: x.name, html: x.name + `<i class="ms-2 fas fa-seedling"></i>`, day: i, id: id,  value: true};
                        list.push(dataparse);
                        let js = JSON.stringify({customDays:list});
                        actStorage.setItem("actiDayChosen",js);
                    }
                    let jspar = JSON.parse(actStorage.getItem("actiDayChosen")).customDays;
                    for(let n of jspar)
                    {
                        if(id === n.id)
                        {
                            isChecked = (n.value == true) ? "checked" : "";
                            break;
                        }
                    }

                    let thisday = "<input type=\"checkbox\" class=\"btn-check\" id="+id+" autocomplete=\"off\" "+isChecked+">"+
                    "<label class=\"btn btn-outline-primary me-2 buttonsMargin\" for="+id+">"+i+"</label>";
                    
                    dayButtons=dayButtons+thisday;
                    listId.push(id);
                }

                // let werk = "<tr><td class=\"actirows\">"+x.name+"</td><td>"+dayButtons+"</td></tr>";
                console.log(x);
                activities=activities+"<tr><td class=\"actirows\">"+x.html+"</td><td>"+dayButtons+"</td></tr>";
            }
        }
    }
    
    if(activities === "")
    {
        activities="<p><strong>No activities selected. Click next to continue.</strong></p>";
        
    }
    else
    {
        activities=activitiesIntro+activities+"</table>";
    }

    $("#acti-list-top").after(activities);
    for(let inc of listId)
    {
        $(`#${inc}`).change(ActiDayClicked);
    }
}

function ActiDayClicked(e){
    // update the storage
    let actStorage = window.localStorage;
    let value = e.target.checked;
    let id = $(e.target)[0].id;
    let json = JSON.parse(actStorage.getItem("actiDayChosen"));
    if(json == null) return;
  
    let customDays = json.customDays.find(x => x.id === id);
    if (customDays == null) return;
    customDays.value = value;
    actStorage.setItem("actiDayChosen", JSON.stringify(json));
}