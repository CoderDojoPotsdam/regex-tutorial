
var languagesLoaded = false;

function updateLanguagePython(regularExpression, text) {
  var regex = JSON.stringify(regularExpression);
  var text = JSON.stringify(text);
  return "import re\nregex = " + regex + "\ntext = " + text + "\nprint(re.findall(regex, text))";
}

function updateLanguageJavaScript(regularExpression, text) {
  var regex = JSON.stringify(regularExpression);
  var text = JSON.stringify(text);
  return "var regex = " + regex + ";\nvar text = " + text + ";\nalert(RegExp(regex).exec(text))";
}

function updateLanguageGrep(regularExpression, text) {
  var regex = regularExpression.replace(/'/g, '\'"\'"\'');
  var text = text.replace(/'/g, '\'"\'"\'');
  return "regex='" + regex + "'\ntext='" + text + "'\necho \"$text\" | grep -E \"$text\"";
}

function updateLanguageGo(regularExpression, text) {
  var regex = regularExpression.replace(/"/g, '\"');
  var text = text.replace(/"/g, '\"');
  return  'package main\n\n' +
          'import "fmt"\n' +
          'import "regexp"\n\n' +
          'func main() {\n' +
          '    regex := "' + regex + '"\n' +
          '    text := "' + text + '"\n\n' +
          '    r, _ := regexp.Compile(regex)\n\n' +
          '    fmt.Println(r.FindAllString(text, -1))\n' +
          '}';
}

updateLanguages = [
  {
    "name": "Python",
    "update": updateLanguagePython,
    "online": "http://pythontutor.com/visualize.html#mode=edit",
  }, {
    "name": "JavaScript",
    "update": updateLanguageJavaScript,
    "online": "https://jsfiddle.net/",
  }, {
    "name": "Grep in Linux Shell",
    "update": updateLanguageGrep,
    "online": "http://www.tutorialspoint.com/execute_bash_online.php",
  }, {
    "name": "Go",
    "update": updateLanguageGo,
    "online": "https://play.golang.org/",
  },
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
    var link = document.createElement("a");
    link.href = lang.online;
    link.appendChild(heading)
    link.target = "_blank";
    div.appendChild(link);
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
