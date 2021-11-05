let _storage = window.localStorage;
let _pageId = this.location.pathname.split("/").pop();

let _state = {
  inputs: []
};

(function initStorage(){
  loadState();

  loadViewInputs();

  //input init events
  initViewInputs();
})();

function loadViewInputs(){
  
  for (i of _state.inputs){
    if (i.pageId != _pageId) continue;

    let elem = document.getElementById(i.elemId);
    if (i.type==="radio") updateRadioGroup(i.elemId,i.value); // elemId of radio is the name
    if (i.type==="checkbox") elem.checked = i.value;
    if (i.type==="textarea") elem.value = i.value;
    if (i.type==="text") elem.value = i.value;
  }
}

function updateRadioGroup(radioName, value){
  $(`input[type=radio][name=${radioName}]`).each(
      (i,e)=>{
        console.log($(`label[for=${e.id}]`).text(), value);
        e.checked = $(`label[for=${e.id}]`).text()===value});
}

function initViewInputs(){
  $(".view textarea").change(changeTextAreaInput);
  $(".view input[type=text]").change(changeTextInput);
  $(".view input[type=radio]").change(changeRadioInput);
  $(".view input[type=checkbox]").change(changeCheckboxInput);
}

function changeTextAreaInput(e){
  let elemId = e.target.id;
  let viewId = $(e.target).closest(".view")[0].id;
  let value = e.target.value;
  let type = "textarea";

  storeInput(elemId,viewId,type,value);
}

function changeTextInput(e){
  console.log(e.target.value);
  let elemId = e.target.id;
  let viewId = $(e.target).closest(".view")[0].id;
  let value = e.target.value;
  let type = "text";

  storeInput(elemId,viewId,type,value);
}

function changeRadioInput(e){
  if (!e.target.checked) return;

  let elemId = e.target.getAttribute("name");
  let viewId = $(e.target).closest(".view")[0].id;
  let value = $(`label[for=${e.target.id}]`).text();
  let type="radio";

  storeInput(elemId,viewId,type,value);

}

function changeCheckboxInput(e){
  let elemId = e.target.id;
  let viewId = $(e.target).closest(".view")[0].id;
  let value = e.target.checked;
  let type = "checkbox";

  storeInput(elemId,viewId,type,value);

}

function storeInput(elemId,viewId,type,value){
  let pageId = _pageId;
  let input = {pageId, elemId, viewId, type, value};

  let oldIndex = _state.inputs.findIndex(i=>i.pageId==pageId && i.viewId==viewId && i.elemId==elemId);

  if (oldIndex >= 0) _state.inputs[oldIndex] = input;
  else _state.inputs.push(input);

  storeState();
}

function storeState(){
  let json = JSON.stringify({data:_state});
  _storage.setItem("myndfully",json);
}

function loadState(){
  let json = _storage.getItem("myndfully");
  if (json != null) _state = JSON.parse(json).data;
}