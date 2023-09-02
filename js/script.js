var questionNumber = 0
var startButton = document.querySelector("#startButton")
var timeEl = document.querySelector("#time");
var secondsLeft = 60;
startButton.addEventListener("click", displayQuestion);
startButton.addEventListener("click", setTime);


//question data
var questions = [
    {question: "commonly used data types do not include:", responses: ["strings","booleans","alerts","numbers"], answer: "alerts"},
    {question: "the condition if an if / else statement is enclosed with ______.", responses: ["quotes","curly brackets","parenthesis","square brackets"], answer: "parenthesis"},
    {question: "arrays in javascript can be used to store _______.", responses: ["numbers and strings","other arrays","booleans","all of the above"], answer: "all of the above"},
    {question: "string values must be enclosed within ______ when being assigned to variables.", responses: ["commas","curly brackets","quotes","parenthesis"], answer: "quotes"},
    {question: "a very useful tool used during development and debugging for printing content to the debugger is:", responses: ["javascript","terminal/bash","for loops","console.log"], answer: "console.log"},
]

function displayQuestion() {
    
    if (questionNumber < 5) {
    var start = document.querySelector("#start");
    start.innerHTML = "";
    var main = document.querySelector("#main");
    main.innerHTML = "";
    var h1El = document.createElement("h1");
    h1El.textContent = questions[questionNumber].question;
    main.appendChild(h1El);

    var answers = document.createElement("div");
    main.appendChild(answers);

    answers.addEventListener("click", answerOnClick);

    for (let i = 0; i < questions[questionNumber].responses.length; i++) {
        var button = document.createElement("button");
        button.textContent = questions[questionNumber].responses[i];
        answers.appendChild(button);
    }
} else {
    allDone()
}
}

function answerOnClick(event) {
    if (event.target.textContent === questions[questionNumber].answer) {
        console.log("correct");
    } else {
    //reduce time
        secondsLeft = secondsLeft-10;
        timeEl.textContent = secondsLeft;
        console.log("incorrect");
    }
    questionNumber++
    displayQuestion()
    
}

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;
    if(secondsLeft <= 0  || questionNumber > 4) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function allDone() {
    var start = document.querySelector("#start");
    start.innerHTML = "";
    var main = document.querySelector("#main");
    main.innerHTML = "";
    var h1El = document.createElement("h1");
    h1El.textContent = "all done!";
    main.appendChild(h1El);
    timeEl.textContent = secondsLeft;
    
    
    var initialsSpan = document.createElement("span");
    main.appendChild(initialsSpan);
    initialsSpan.textContent = "enter your initials and click submit to record your score; select reset to try again!";
    
    
    var initialsEl = document.createElement("input");
    main.appendChild(initialsEl);
    
    
    var submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    main.appendChild(submitBtn);

    var resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset";
    main.appendChild(resetBtn)

    submitBtn.addEventListener("click", saveScore);
    submitBtn.addEventListener("click", renderScores);
    resetBtn.addEventListener("click", restart);

function saveScore() {
    var initials = initialsEl.value.trim();
    if (!localStorage.getItem("highscores")) {
        localStorage.setItem("highscores",JSON.stringify([{initial: initials, score: secondsLeft}]));
    } else {
        var highscores = JSON.parse(localStorage.getItem("highscores"));
        highscores.push({initial: initials, score: secondsLeft});
        localStorage.setItem("highscores", JSON.stringify(highscores))
    }
}
function renderScores() {
    var ulEl = document.createElement('ul');
    ulEl.textContent = "current scores";
    main.appendChild(ulEl)
    var highscoresList = JSON.parse(localStorage.getItem("highscores"));
    
    for (var i = 0; i < highscoresList.length; i++) {
        console.log(highscoresList[i]);

        
        var liEl = document.createElement('li');
        liEl.textContent = highscoresList[i].initial + " " + highscoresList[i].score;
        ulEl.appendChild(liEl)
    }
}
}

function restart(event) {
    event.stopPropagation();
    location.reload();
}