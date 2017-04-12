/**
 * These are the requirements to successfully leave a page
 */

var requirements = [];

function required(callable) {
  requirements.push(callable);
}

function getId() {
  return "requirements.js-" + current_page_id;
}

function getLinkId(link) {
  return "requirements.js-" + link.id
}

function updateRequirements() {
  var allTrue = true;
  for (var i = 0; i < requirements.length; i += 1) {
    var requirement = requirements[i];
    allTrue = requirement() && allTrue;
  }
  if (current_page_id) {
    allTrue = allTrue || getCookie(getId());
    setCookie(getId(), allTrue);
  }
  updateLinks();
}

function updateLinks() {
  var links = document.getElementsByClassName("step");
  for (var i = 0; i < links.length; i += 1) {
    var link = links[i];
    if (link.id) {
      var status = getCookie(getLinkId(link));
      if (status) {
        link.classList.add("done");
      } else {
        link.classList.remove("done");
      }
    }
  }
  if (getCookie(getId())) {
    document.body.classList.add("requirements-satisfied");
  } else {
    document.body.classList.remove("requirements-satisfied");
  }
}

window.addEventListener("load", function(){
  updateLinks();
});


