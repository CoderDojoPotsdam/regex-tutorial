
window.addEventListener("load", function(){
  var quizzes = document.getElementsByClassName("quiz");
  for (var i = 0; i < quizzes.length; i += 1) {
    var quiz = quizzes[i];
    var regex = getPlayfieldElement(quiz, i, "regex");
    var examples = getPlayfieldElement(quiz, i, "examples");
    var message = getPlayfieldElement(quiz, i, "message");
    
    watchExpression(playfield, examples, regex, message);
  }
});


