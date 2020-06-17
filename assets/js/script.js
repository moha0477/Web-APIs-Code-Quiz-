//variables
var userInitials = document.querySelector("#userInitials");
var quizComplete = document.querySelector("#quizComplete");
var playerScore = document.querySelector("#playerScore");
var submitScore = document.querySelector("#submit");
var startQuiz = document.querySelector("#startQuiz");
var clickQuiz = document.querySelectorAll(".clickQuiz");
var secondsRemaining = 61;
var currentIndex = 0;
var score = 0;

//timer function
function startTimer () {
  var interval = setInterval(function() {
    secondsRemaining--;
    document.querySelector("#timer").innerHTML = secondsRemaining;
    if (secondsRemaining === 0) {
      clearInterval(interval);
      //secondSection contains the quiz questions and gets hidden when the time runs out 
      document.querySelector("#secondSection").setAttribute("style", "display: none");
      //thirdSection becomes visible and shows "GAME OVER" on the screen
      document.querySelector("#thirdSection").setAttribute("style", "display: block");
    // when the user finishes all the questions before the time runs out
    } else if (currentIndex === 5) {
      clearInterval(interval); 
      //secondSection is hidden  
      document.querySelector("#secondSection").setAttribute("style", "display: none");
      //fourthSection, which shows the user their final score, is shown on the screen
      document.querySelector("#fourthSection").setAttribute("style", "display: block");
      //muliply the value of the remaining time (displayed in the upper right corner) by 5 (the amount of existing questions) to get the final score
      score = ((score)*(secondsRemaining));
      //if the user gets every question wrong
      if (isNaN(score)) {
        playerScore.innerHTML = "Your score is: 0";
      } else {
        //if the user gets atleast one question right and earns points
        quizComplete.innerHTML = "Congrats, you completed the challenge!";
        playerScore.innerHTML = "Your score is: " + score;
      }
    }
  }, 1000) 
}

//use the click event to start the timer and switch from the intro screen to the screen that contains the first question
startQuiz.addEventListener("click", function(event){
  event.stopPropagation();
  startTimer();
  document.querySelector("#firstSection").style.display = "none"; 
  document.querySelector("#secondSection").style.display = "block";
  viewQuiz();
});

//create a multidimentional array for the quiz questions and assign a variable to it
var quiz = [
  { question: "It is valid to pass an anonymous function as an argument to another function? ",
    options: ["true", "false", "maybe", "idk!"],
    answer: "true" },
  { question: "Which of the following methods removes the last element from an array and returns that element? ",
    options: ["get()", "last()", "pop()", "none"],
    answer: "pop()" },
  { question: "Select a function of an array object which returns a new array comprised of the current array or its value(s). ",
    options: ["concat()", "some()", "push()", "pop()"],
    answer: "concat()" },
  { question: "Which of the following objects is also referred to as the global object? ",
    options: ["browser object", "screen object", "document object", "window object"],
    answer: "window object" },
  { question: "Which operator returns true if an expression is false, and returns false if an expression is true? ",
    options: ["!", "&&", "?", "||"],
    answer: "!" },
];

//view all of the questions on the screen 1 by 1 along with their multiple choice options
function viewQuiz() {
  var show = quiz[currentIndex];
  
  document.querySelector("#question").innerHTML = show.question;
  document.querySelector("#option1").innerHTML = show.options[0];
  document.querySelector("#option2").innerHTML = show.options[1];
  document.querySelector("#option3").innerHTML = show.options[2];
  document.querySelector("#option4").innerHTML = show.options[3];
} 

for (var i = 0; i < clickQuiz.length; i++) {
  clickQuiz[i].addEventListener("click", function userAnswer(event) {
      event.stopPropagation();
      //if the user answers correctly, "correct" is shown on the screen
      if(event.currentTarget.innerText === quiz[currentIndex].answer){
          score++;
          console.log(score);
          document.querySelector("#seeSolution").innerHTML = "correct";
      } else {
          //if the user answers incorrectly, "incorrect" is shown on the screen and 10 seconds is subtracted from the clock
          document.querySelector("#seeSolution").innerHTML = "wrong";
          secondsRemaining = secondsRemaining - 10;
      } //continue on to the next question
      currentIndex++;  
      if (currentIndex < 5) {
      //go back to viewing the questions on the screen
      viewQuiz();
      }
  });
}

//add an event handler to the submit button
submitScore.addEventListener("click", function(event) {
  //this method prevents the event from bubbling up to parent elements or capturing down to child elements
  event.stopPropagation();
  
  var initials = userInitials.value; 
  
  var lastScore = {
    initials, 
    score
  };
  //store info in local storage
  //use setItem to create a new key and give a value to that key
  //JSON.stringify converts a JS object into a string
  highscores.push(lastScore);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  console.log(initials, score);
});

//return the value of the key and convert it from a string back into an object OR just set the variable to an empty array
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
