var errorMessages = {
  "unterminated character class" : "Unverständlicher regulärer Ausdruck: Eine Klammer wurde nicht geschlossen! Bitte schließe die Klammer wieder, damit der reguläre Ausdruck verarbeitet werden kann.  ",
  "unterminated parenthetical": "Eine Klammer wurde nicht geschlossen. Bitte schreibe eine schließende Klammer \")\" in den regulären Ausdruck.",
  "unmatched ) in regular expression": "Es gibt eine schließende Klammer aber dazu gibt es keine geöffnete Klammer. Schreibe eine geöffnete Klammer \"(\" vor die schließende Klammer \")\", um den Fehler zu beheben."
}

function translateErrorMessage(message) {
  var translation = (errorMessages[message] || "Bitte übersetzen.");
  return "\"" + message + "\": " + translation;
}

function matchTextElement(string) {
  var div = document.createElement('div');
  div.innerText = string;
  div.classList.add("text-match");
  return div;
}
function nomatchTextElement(string) {
  var div = document.createElement('div');
  div.innerText = string;
  div.classList.add("text-nomatch");
  return div;
}

function matchExample(match, example) {
  var text = example.innerText;
  var start = match.index;
  var stop = match.index + match[0].length;
  var textBefore = text.slice(0, start);
  var textMatch = text.slice(start, stop);
  var textAfter = text.slice(stop, text.length);
  
  example.innerHTML = "";
  example.appendChild(nomatchTextElement(textBefore));
  example.appendChild(matchTextElement(textMatch));
  example.appendChild(nomatchTextElement(textAfter));
  example.classList.add("match");
  example.classList.remove("nomatch");
}

function unmatchExample(example) {
  var text = example.innerText;
  example.innerHTML = "";
  example.appendChild(nomatchTextElement(text));
  example.classList.remove("match");
  example.classList.add("nomatch");
}

function watchExpression(playfield, examples, regex, message) {
  function check() {
    playfield.classList.remove("success");
    var exp = undefined;
    try {
      exp = RegExp(regex.value);
    } catch (err){
      message.innerHTML = translateErrorMessage(err.message);
      regex.classList.add("error");
      message.classList.add("error");
      return;
    }
    message.innerHTML = "";
    regex.classList.remove("error");
    message.classList.remove("error");
    var example_list = examples.getElementsByTagName("li");
    var allCorrect = true;
    for (var i = 0; i < example_list.length; i += 1) {
      var example = example_list[i];
      var text = example.innerText;
      var shouldNotMatch = example.classList.contains("fail");
      var match = exp.exec(text);
      if (match) {
        matchExample(match, example);
      } else {
        unmatchExample(example);
      }
      allCorrect = !match == shouldNotMatch && allCorrect;
    }
    if (allCorrect) {
      playfield.classList.add("success");
    }
  }
  regex.onkeyup = check;
  check();
}

function getPlayfieldElement(playfield, index, name) {
  var playfieldElements = playfield.getElementsByClassName(name);
  if (playfieldElements.length != 1) {
    alert("ERROR: Field number " + index + " must have one '" + name + "' field.");
  }
  return playfieldElements[0];
}

window.addEventListener("load", function(){
  var playfields = document.getElementsByClassName("playfield");
  for (var i = 0; i < playfields.length; i += 1) {
    var playfield = playfields[i];
    var regex = getPlayfieldElement(playfield, i, "regex");
    var examples = getPlayfieldElement(playfield, i, "examples");
    var message = getPlayfieldElement(playfield, i, "message");
    
    watchExpression(playfield, examples, regex, message);
  }
});


