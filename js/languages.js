
var languagesLoaded = false;

function updateLanguagePython(regularExpression, text) {
  var regex = JSON.stringify(regularExpression);
  var text = JSON.stringify(text);
  return "import re\nregex = " + regex + "\ntext = " + text + "\nprint(re.findall(regex, text))";
}

function updateLanguageJavaScript(regularExpression, text) {
  var regex = JSON.stringify(regularExpression);
  var text = JSON.stringify(text);
  return "regex = " + regex + ";\ntext = " + text + ";\nalert(RegExp(regex).exec(text))";
}

function updateLanguageGrep(regularExpression, text) {
  var regex = regularExpression.replace(/'/g, '\'"\'"\'');
  var text = text.replace(/'/g, '\'"\'"\'');
  return "regex='" + regex + "'\ntext='" + text + "'\necho \"$text\" | grep -E \"$text\"";
}

updateLanguages = [
  {"name": "Python", "update": updateLanguagePython},
  {"name": "JavaScript", "update": updateLanguageJavaScript},
  {"name": "Grep in Linux Shell", "update": updateLanguageGrep},
]

function watchLanguageField(languageField, textElement, regex) {
  var textareas = [];
  for (var i = 0; i < updateLanguages.length; i++) {
    var lang = updateLanguages[i];
    var div = document.createElement("div");
    languageField.appendChild(div);
    div.classList.add("programming-language")
    var heading = document.createElement("h2");
    heading.innerText = lang.name;
    div.appendChild(heading);
    var textarea = document.createElement("textarea");
    div.appendChild(textarea);
    textareas.push(textarea);
  }
  function update() {
    for (var i = 0; i < updateLanguages.length; i++) {
      var textarea = textareas[i];
      var programUpdate = updateLanguages[i].update;
      var text = programUpdate(regex.value, textElement.value);
      textarea.value = text;
      var lines = (text.match(/\n/g) || []).length + 1;
      textarea.rows = lines;
    }
  }
  regex.onkeyup = update;
  textElement.onkeyup = update;
  update();
}

function getLanguageElement(languageField, index, name) {
  return getPlayfieldElement(languageField, index, name);
}

function loadLanguages(){
  if (languagesLoaded) {
    return;
  }
  var languageFields = document.getElementsByClassName("language");
  for (var i = 0; i < languageFields.length; i += 1) {
    var languageField = languageFields[i];
    var regex = getLanguageElement(languageField, i, "regex");
    var textElement = getPlayfieldElement(languageField, i, "text");
    watchLanguageField(languageField, textElement, regex);
    if (i == 0) {
      regex.focus();
    } 
  }
  languagesLoaded = true;
}
window.addEventListener("load", loadLanguages);
