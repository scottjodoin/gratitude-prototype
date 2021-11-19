if (_currentViewId === "goals-activities")
{
    let json = _storage.getItem("actiNameStorage");
    if(json != null)
    {
        json = JSON.parse(json).customInputs;
        console.log("herere");
        for(let n of json)
        {
            let name = n.name.replaceAll(" ","-");
            let l = "<div id=act-"+name+"-div><input type=checkbox class=\"btn-check\" id=act-"+name+" autocomplete=\"off\">"+
            "<label class=\"CustomActiLeft btn btn-outline-primary me-2\" for=act-"+name+">"+n.name+"<i class=\"fas fa-seedling\"></i></label>"+
            "<button onclick=\"deleteActivity('act-"+name+"-div')\" class=\"CustomActiRight btn btn-outline-secondary me-2\">X</button> </div>";
            $("#addAfterThis").after(l);
            console.log(n.name);
        }
    }
}