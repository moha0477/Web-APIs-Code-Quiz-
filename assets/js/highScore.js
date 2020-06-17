//High Scores 

//variables
var scoreList = document.querySelector("#scoreList");
var clearScore = document.querySelector("#clear");
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

//this element makes sure that the file has been completely loaded
window.addEventListener("load", function(){display()});

//to see the highscores and initials show up on the screen
function display() {
    highscores = arrange(highscores, 'score');
    
    for (var i = 0; i < highscores.length; i++) {
      console.log(highscores[i].score);
      var list = document.createElement("li");
      var content = document.createTextNode(highscores[i].initials + ": " + highscores[i].score)  ;
      //append the new 'list' to the existing id = scoreList as its child
      scoreList.appendChild(list);
      //append the new text content to the new 'list' as its child
      list.appendChild(content);
    }
}
//list the high scores from greatest to smallest 
function arrange(array, key) {
  return array.sort(function(a,b) {
    if (a.score < b.score) {
      return 1;
    }
    return -1;
  });
}
//clear scores from the local storage
clearScore.addEventListener("click", function() {
    localStorage.removeItem("highscores");
    window.location.reload();
});