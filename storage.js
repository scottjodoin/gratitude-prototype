let _storage = window.localStorage;

(function initStorage(){
  //input init events
  initViewInputs();
})();

function initViewInputs(){
  $(".view input").each(initViewInput);
}

function initViewInput(i,elem){
  $elem = $(elem);
  let viewId = $elem.closest(".view")[0].id;
  let elemId = $elem[0].id;

  let storageValue = getValue(viewId,elemId);
  if (!!storageValue){
    let type = $elem.attr("type");
    if (type === "checkbox" || type === "radio"){
      if (storageValue === "true") $elem.prop("checked",true);
      else $elem.removeProp("checked");
    } else {
      $elem.val(storageValue);
    }
  }

  //let action = (isCheckable($elem)) ? "click" : "change";
  $elem.on("change",viewInputChanged);
    
}
function isCheckable($elem){
  return ["radio","checkbox"].includes($elem.attr("type"));
}

function clearValue(viewId,elemId){
  _storage.clearItem(`${viewId}[${elemId}]`);
}

function getValue(viewId,elemId){
  // e.g. checkin-1[inputelemid]
  return _storage.getItem(`${viewId}[${elemId}]`);
}

function getRadioText(name){
  let text = "";
  $(`input[name=${name}`).each((i,e)=>{

    let viewId = $elem.closest(".view")[0].id;
    let checked = getValue(viewId,e.id) == "true";

    if (checked)
      text = $(`label[for=${e.id}]`)[0].innerText;
  });
  return text; // when none selected
}


function storeValue(viewId,elemId,value){
  if (value == null){
    console.warn(`attempted to set null value at ${viewId}[${elemId}]`);
    return;
  }
  _storage.setItem(`${viewId}[${elemId}]`,value);
}

function flushRadioButtons($elem, value){
    // update all the other radio buttons
    let viewId = $elem.closest(".view")[0].id;
    let radioName = $elem.prop("name");
    $(`input[name=${radioName}]`).each((i,e)=>{
      storeValue(viewId,e.id,value);
    });
}

function viewInputChanged(e){
  if (!e) return;
  let $elem = $(e.target); // jQuery object
  let viewId = $elem.closest(".view")[0].id;
  let elemId = $elem[0].id;

  let type = $elem.prop("type");

  let value = "";
  if (type === "checkbox") {
    value = $elem.prop("checked");
  } else if (type === "radio"){
    flushRadioButtons($elem,false);
    value = $elem.prop("checked");
  } else {
    value = $elem.val();
  }

  storeValue(viewId,elemId,value);
}