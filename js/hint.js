
var hintClasses = ["clicked", "secret"];

function watchHint(hint) {
  var added = 0;
  var wrap = document.createElement("div");
  wrap.classList.add("hint-wrap");
  hint.parentNode.replaceChild(wrap, hint);
  var button = document.createElement("div");
  button.classList.add("toggle-hint");
  wrap.appendChild(button);
  wrap.appendChild(hint);
  function click() {
    wrap.classList.remove(hintClasses[added]);
    added = 1 - added;
    wrap.classList.add(hintClasses[added]);
  }
  wrap.onclick = click;
  click();
}

window.addEventListener("load", function(){
  var hints = document.getElementsByClassName("hint");
  for (var i = 0; i < hints.length; i += 1) {
    var hint = hints[i];
    watchHint(hint);
  }
});
