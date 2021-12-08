let _storage = window.localStorage;
let _pageId = this.location.pathname.split("/").pop();

let _state = {
  inputs: [],
};
initStorage();

function initStorage(){
  loadState();
  loadViewInputs();

  //input init events
  initViewInputs();
}

function loadViewInputs() {
  for (i of _state.inputs) {
    if (i.pageId != _pageId) continue;
    
    let elem = document.getElementById(i.elemId);
    
    if (elem == null) continue;
    if (i.type === "radio") updateRadioGroup(i.elemId, i.text); // elemId of radio is the name
    if (i.type === "checkbox") elem.checked = i.value;
    if (i.type === "textarea") assignTextArea(elem, i.value);
    if (i.type === "text") elem.value = i.value;
  }
}
function assignTextArea(elem, text){
  setTimeout(()=>{elem.value = text;},50);
}
function updateRadioGroup(radioName, value) {
  $(`input[type=radio][name=${radioName}]`).each((i, e) => {
    e.checked = $(`label[for=${e.id}]`).text() === value;
  });
}

function initViewInputs() {
  $(".view textarea").change(changeTextAreaInput);

  $(".view input[type=radio]")
    .change(changeRadioInput);
  $(".view input[type=radio][checked]")
    .each((i, e) => {changeRadioInput({target:e});});

  $(".view input[type=checkbox]")
    .change(changeCheckboxInput);
  $(".view input[type=checkbox]")
    .each((i, e) => {changeCheckboxInput({target:e});});

  $(".view input[type=text]").change(changeTextInput);

}

function changeTextAreaInput(e) {
  let data = {
    elemId: e.target.id,
    viewId: $(e.target).closest(".view")[0].id,
    value: e.target.value,
    type: "textarea",
  };

  storeInput(data);
}

function changeTextInput(e) {
  let data = {
    elemId: e.target.id,
    viewId: $(e.target).closest(".view")[0].id,
    value: e.target.value,
    type: "text",
  };

  storeInput(data);
}

function changeRadioInput(e) {
  if (!e.target || !e.target.checked) return;

  let data = {
    elemId: e.target.getAttribute("name"),
    radioId: e.target.id,
    viewId: $(e.target).closest(".view")[0].id,
    text: $(`label[for=${e.target.id}]`).text(),
    html: $(`label[for=${e.target.id}]`).html(),
    type: "radio",
  };

  storeInput(data);
}

function changeCheckboxInput(e) {
  if (!e.target) return;
  
  let data = {
    elemId: e.target.id,
    viewId: $(e.target).closest(".view")[0].id,
    text: $(`label[for=${e.target.id}]`).text(),
    html: $(`label[for=${e.target.id}]`).html(),
    value: e.target.checked,
    type: "checkbox",
  };

  storeInput(data);
}

function storeInput(data) {
  let pageId = _pageId;
  let input = { pageId, ...data };

  let oldIndex = _state.inputs.findIndex(
    (i) =>
      i.pageId == input.pageId &&
      i.viewId == input.viewId &&
      i.elemId == input.elemId
  );

  if (oldIndex >= 0) _state.inputs[oldIndex] = input;
  else _state.inputs.push(input);

  storeState();
}

function storeState() {
  let json = JSON.stringify({ data: _state });
  _storage.setItem("myndfully", json);
}

function loadState() {
  let json = _storage.getItem("myndfully");
  if (json != null) _state = JSON.parse(json).data;
}
