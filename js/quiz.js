
var quizzesLoaded = false;

function prependChoice(choice, correctness) {
    var div = document.createElement("span");
    div.classList.add("button");
    div.classList.add(correctness);
    choice.prepend(div);
    div.onclick = function() {
      for (var i = choice.classList.length - 1; i >= 0; i -= 1 ) {
        var cls = choice.classList[i];
        if (cls.startsWith("chosen-")) {
          choice.classList.remove(cls);
        }
      }
      choice.classList.add("chosen-" + correctness);
      updateRequirements();
    }
}

function addChoiceRequirement(choice) {
  required(function() {
    return choice.classList.contains("ok") && choice.classList.contains("chosen-button-ok") || choice.classList.contains("fail") && choice.classList.contains("chosen-button-fail");
  });
}

function watchQuiz(quiz, expression, choicesList, index) {
  var choices = choicesList.getElementsByTagName("li");
  var regexText = expression.innerText;
  expression.innerHTML = "<span class='regex'>" + expression.innerHTML + "</span>";
  var exp = null;
  try {
    exp = RegExp(regexText);
  } catch (err) {
    alert("Error in regular expression in quiz " + index + ": " + err.message);
    return;
  }
  for (var i = 0; i < choices.length; i += 1) {
    var choice = choices[i];
    var match = exp.exec(choice.innerText);
    if (match) {
      choice.classList.add("ok");
    } else {
      choice.classList.add("fail");
    }
    prependChoice(choice, "button-fail");
    prependChoice(choice, "button-ok");
    addChoiceRequirement(choice);
  }
}

function getQuizElement(quiz, index, name) {
  var playfieldElements = quiz.getElementsByClassName(name);
  if (playfieldElements.length != 1) {
    alert("ERROR: Quiz number " + index + " must have one '" + name + "' field.");
  }
  return playfieldElements[0];
}

function loadQuizzes(){
  if (quizzesLoaded) {
    return;
  }
  var quizzes = document.getElementsByClassName("quiz");
  for (var i = 0; i < quizzes.length; i += 1) {
    var quiz = quizzes[i];
    var expression = getQuizElement(quiz, i, "expression");
    var choices = getQuizElement(quiz, i, "choices");

    watchQuiz(quiz, expression, choices, i);
  }
  quizzesLoaded = true;
}
window.addEventListener("load", loadQuizzes);
