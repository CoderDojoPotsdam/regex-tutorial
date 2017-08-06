/**
 * These are the requirements to successfully leave a page
 * and the links on the top, marked or unmarked.
 */

var requirements = [];

function required(callable) {
  requirements.push(callable);
}

function getId() {
  return getCookieId(current_page_id);
}

function getLinkId(link) {
  return getCookieId(link.id);
}

function getCookieId(page_id) {
  /* The id of pages for the cookies */
  var numbering_regex = /\d+-\d+/;
  var numbering = numbering_regex.exec(page_id);
  return "requirements.js-step-" + numbering[0];
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

function loadRequirements(){
  loadPlayfields();
  loadQuizzes();
  updateRequirements(); // turn pages green if they are not interactive
};
window.addEventListener("load", loadRequirements);
