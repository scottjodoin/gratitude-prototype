if(_currentViewId === "landing")
{
    checkinActiList();
}

function checkinActiList()
{
    let actStorage = window.localStorage;
    
    // let noLonger = actStorage.getItem("visited");

    actStorage.setItem("firstTime",false)

    let json = actStorage.getItem("actiNameStorage");
    let k;
    activities="";
    let jsonstore = actStorage.getItem("CheckInActiStorage");

    if(jsonstore==null)
    {
      let newthing = {EachActivity:[]}
      actStorage.setItem("CheckInActiStorage",JSON.stringify(newthing));
      jsonstore = actStorage.getItem("CheckInActiStorage");
    }

    let list = JSON.parse(jsonstore).EachActivity;

    for(let x of _state.inputs)
    {
        let v = x["viewId"];
        let t = x["text"];
        let html = x["html"] || t;        

        if(v == "goals-activities" && x["value"]==true) //activity
        {
            let id = "check-"+x["elemId"];
            
            let inList = false;
            for(let n in list)
            {
                if(id === list[n].id)
                {
                    inList=true;
                    list[n].exist=true;
                    let js = JSON.stringify({EachActivity:list});
                    actStorage.setItem("CheckInActiStorage",js);
                    break;
                }
            }

            if(inList == false)
            {
                let dataparse = {name: t, html: html, id: id,  value: false, exist: true};
                list.push(dataparse);
                let js = JSON.stringify({EachActivity:list});
                actStorage.setItem("CheckInActiStorage",js);
            }
        }
        else if(v == "goals-activities" && x["value"]==false)
        {
            let id = "check-"+x["elemId"];
            
            for(let l in list)
            {
                if(id === list[l].id)
                {
                    list[l].exist=false;
                    list[l].value=false;
                    let js = JSON.stringify({EachActivity:list});
                    actStorage.setItem("CheckInActiStorage",js);
                    break;
                }
            }
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
                console.log(x.name)
                let id = "check-"+x.id;
            
                let inList = false;
                for(let n in list)
                {
                    if(id === list[n].id)
                    {
                        inList=true;
                        list[n].exist=true;
                        let js = JSON.stringify({EachActivity:list});
                        actStorage.setItem("CheckInActiStorage",js);
                        break;
                    }
                }

                if(inList == false)
                {
                    let dataparse = {name: x.name, html: x.html, id: id,  value: false, exist: true};
                    list.push(dataparse);
                    let js = JSON.stringify({EachActivity:list});
                    actStorage.setItem("CheckInActiStorage",js);
                }
            }
            else
            {
                let id = "check-"+x.id;
            
                for(let l in list)
                {
                    if(id === list[l].id)
                    {
                        list[l].exist=false;
                        list[l].value=false;
                        let js = JSON.stringify({EachActivity:list});
                        actStorage.setItem("CheckInActiStorage",js);
                        break;
                    }
                }
            }
        }
    }
    
    jsonstore = actStorage.getItem("CheckInActiStorage");
    let actilist = JSON.parse(jsonstore).EachActivity;
    let deletedActi =[];
    json = actStorage.getItem("actiNameStorage");
    for (let x of actilist)
    {
        let inList = false;
        for(let n of _state.inputs)
        {
            let id = "check-"+n["elemId"];

            if(id === x.id)
            {
                inList=true;
                break;
            }
        }

        if(json!=null && inList==false)
        {
            k= JSON.parse(json).customInputs;
            for(let l of k)
            {
                let id = "check-"+l.id;
                if(id === x.id)
                {
                    inList=true;
                    break;
                }
            }
        }

        if(inList == false)
        {
            deletedActi.push(x.id);
        }
    }

    actilist = JSON.parse(jsonstore).EachActivity;
    for(let n of deletedActi)
    {
        console.log(n);
        for(let l in actilist)
        {
            if(n === actilist[l].id)
            {
                actilist[l].exist=false;
                actilist[l].value=false;
                let js = JSON.stringify({EachActivity:actilist});
                actStorage.setItem("CheckInActiStorage",js);
                break;
            }
        }
    }
    

    jsonstore = actStorage.getItem("CheckInActiStorage");
    actilist = JSON.parse(jsonstore).EachActivity;

    let hasActi = false;
    for (let x of actilist)
    {
        console.log(x);
        if(x.exist == true)
        {
            hasActi = true;
            let id = x.id;
            let isChecked = (x.value == true) ? "checked" : "";
            let l = "<input type=checkbox class=\"btn-check\" id="+id+" autocomplete=\"off\" "+isChecked+">"+
            "<label class=\"btn btn-outline-primary me-2 buttonsMargin\" for="+id+">"+x.html || x.text +"</label>";
            $("#Checkin-Acti-Placement").before(l);
            $(`#${id}`).change(CheckInActiClicked);
        }
    }

    if(hasActi == false)
    {
        $("#landing").addClass("d-none");
        $("#landing-default")[0].click();
        let l = "<p><strong>No activities have been selected to track.</p>";
        $("#Checkin-Acti-Placement").before(l);
    }
}

function CheckInActiClicked(e){
    // update the storage
    console.log(e)
    let actStorage = window.localStorage;
    let value = e.target.checked;
    let id = $(e.target)[0].id;
    let json = JSON.parse(actStorage.getItem("CheckInActiStorage"));
    if(json == null) return;
  
    let EachActivity = json.EachActivity.find(x => x.id === id);
    if (EachActivity == null) return;
    EachActivity.value = value;
    actStorage.setItem("CheckInActiStorage", JSON.stringify(json));
}

if(_currentViewId === "activity-reminder")
{
    activityReminder();
}

function activityReminder()
{
    let actStorage = window.localStorage;
    let jsonstore = actStorage.getItem("CheckInActiStorage");
    
    let actiNotDone = "";
    let pass = false;
    let l="";
    if(jsonstore!=null)
    {
        
        let actilist = JSON.parse(jsonstore).EachActivity;
        
        for(let x of actilist)
        {
            if(x.value==false && x.exist == true)
            {
                actiNotDone += "<li>"+x.name.trim() + "</li>";
            }
            if(x.value==true && x.exist == true)
            {
                pass=true;
            }
        }
    }

    if(actiNotDone === "")
    {

      l = (pass == true)
        ? "<h5><strong>All activities are completed.</strong> </h5>"
        : "<h5><strong>No activities are being tracked.</strong> </h5>";
        $("#endScreen-Activities").before(l);
        $("#activity-reminder").addClass("d-none");
        $("#activity-reminder-default")[0].click(); // click on the button
    }
    else
    {
        l="<h3>Here is your reminder to complete one or more of these activities:</h3><h2><ul>" + actiNotDone + "</ul></h2>";
        $("#endScreen-Activities").before(l);
        let h = "<p>Think of something that takes less than <strong>2 minutes</strong> to complete.</p><h2>Are you going to do it now?</h2>";
        $("#endScreen-Activities").before(h);
    }

    
}