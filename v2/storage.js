_storage = window.localStorage;

(function initStorage(){
  //input init events
  initViewInputs();
})();

function initViewInputs(){
  $(".view>input").each(initViewInput);
}

function initViewInput(i,elem){
  let $elem = $(elem);
  let viewId = $elem.closest(".view").id;
  let elemId = $elem.id;

  let storageValue = getValue(viewId,elemId);
  if (!!storageValue)
    $elem.val(storageValue);
  $elem.on("change",viewInputChanged);
}

function clearValue(viewId,elemId){
  _storage.clearItem(`${viewId}[${elemId}]`);
}

function getValue(viewId,elemId){
  // e.g. checkin-1[inputelemid]
  return _storage.getItem(`${viewId}[${elemId}]`);
}

function storeValue(viewId,elemId,value){
  if (value == null){
    console.warn(`attempted to set null value at ${viewId}[${elemId}]`);
    return;
  }
  _storage.setItem(`${viewId}[${elemId}]`,value);
}

function viewInputChanged(e){
  if (!e) return;
  let $elem = $(e.target); // jQuery object
  let viewId = $elem.closest(".view").id;
  let elemId = $elem.id;
  let value = $elem.val();
  storeValue(viewId,elemId,value);
}