$(function () {
  let $mytext = $("#entryTextarea");
  $mytext.val("- \n- \n- ");

  $mytext.on("keydown", mytextKeyDown);
  $mytext.on("keyup", mytextKeyUp);

  let _shiftDown = false;

  function mytextKeyUp(e) {
    if (e.keyCode == 16)
      // shift
      _shiftDown = false;
  }

  function mytextKeyDown(e) {
    if (e.keyCode == 16)
      // shift
      _shiftDown = true;

    let curText = $mytext.val();

    if (curText == "") {
      $mytext.val("- ");
      if (e.keyCode == 13) e.preventDefault();
    }
    let ss = $mytext[0].selectionStart;
    let prevN = curText.substring(0, ss).lastIndexOf("\n") || 0;
    let prevDot = curText.indexOf(" ", prevN);
    let len = prevDot - prevN + 1;

    let selection = curText.substring(
      $mytext[0].selectionStart,
      $mytext[0].selectionEnd
    );

    if (e.keyCode == 13) {
      e.preventDefault();

      // enter
      $mytext.val(curText.substring(0, ss) + "\n- " + curText.substring(ss));
      $mytext[0].setSelectionRange(ss + 3, ss + 3);
    }

    // Don't get stuck inside the bullet point
    if (ss - prevN < len && ![33, 34, 35, 36, 37, 38, 40].includes(e.keyCode))
      e.preventDefault();

    if (e.keyCode == 8 || e.keyCode == 37 || (e.keyCode == 9 && _shiftDown)) {
      // backspace, left, shift-tab
      if (ss <= 2) e.preventDefault();
      if (ss - prevN == len && ss > 2 && selection.length == 0) {
        if (e.keyCode == 8)
          // backspace
          $mytext.val(curText.substring(0, prevN) + curText.substring(ss));
        $mytext[0].setSelectionRange(prevN, prevN);
        e.preventDefault();
      }
    }

    if (e.keyCode == 39 || (e.keyCode == 9 && !_shiftDown)) {
      //right and tab
      if (e.keyCode == 9 && !_shiftDown && ss < curText.length - 1)
        e.preventDefault();

      if (curText.charAt(ss) == "\n" || ss - prevN < len) {
        e.preventDefault();
        let nextDot = curText.indexOf(" ", ss) + 1 || curText.length;
        $mytext[0].setSelectionRange(nextDot, nextDot);
      }
    }

    if (e.keyCode == 46) {
      //delete

      if (selection.indexOf("\n") >= 0) e.preventDefault();

      if (curText.charAt(ss) == "\n" && selection.length == 0) {
        e.preventDefault();
        let nextDot = curText.indexOf(" ", ss) + 1 || curText.length;
        $mytext.val(curText.substring(0, ss) + curText.substring(nextDot));
        $mytext[0].setSelectionRange(ss, ss);
      }
    }
  }
});
