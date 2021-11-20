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
            "<label class=\"CustomActiLeft btn btn-outline-primary me-2\" for="+id+">"+n.name+"<i class=\"ms-2 fas fa-seedling\"></i></label>"+
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