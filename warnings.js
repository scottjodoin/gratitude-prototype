// this file will warn users.
let _warningModal;
warningInit();

if (_currentViewId==="goals-activities"){
  $("#goals-activities-next").click(function(e){
      // check if any activities are checked
      if ($("#goals-activities")
        .find("input:checked").length > 0) return;

      e.preventDefault();
      warningMessage({
        title: "Are you sure?",
        message: "You have not checked in any activities yet. That's fine. It just means no activities will be tracked in the check-in process.",
        success: ()=>{window.location=$(e.target).attr("href");},
        okText: "Yes, continue"
    })});
}

function warningInit(){
  $("body").append(`<div class="modal fade static" id=warning-modal tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="warning-title" class="modal-title">Modal title</h5>
          <button type="button" class="btn-close warning-cancel" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p id="warning-message"></p>
        </div>
        <div class="modal-footer">
          <button type="button" id=warning-cancel class="warning-cancel btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" id=warning-ok class="warning-ok btn btn-primary">OK</button>
        </div>
      </div>
    </div>
  </div>`);

  _warningModal = new bootstrap.Modal(document.getElementById("warning-modal"));
}

function warningMessage({title,message, cancelText, okText, success, cancel}) {
  $("#warning-title").text(title);
  $("#warning-message").text(message);
  $("#warning-cancel").text(cancelText || "Cancel");
  $("#warning-ok").text(okText || "OK");

  $(".warning-ok").off();
  $(".warning-cancel").off(); // remove existing event listeners

  _warningModal.show();
  if (typeof success === "function") $(".warning-ok").click(success);
  if (typeof cancel === "function") $(".warning-cancel").click(cancel);

  _warningModal.show();
}