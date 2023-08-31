var questionNumber = 0
var startButton = document.querySelector("#startButton")
startButton.addEventListener("click", displayQuestion);



//question data
var questions = [
    {question: "commonly used data types do not include:", responses: ["strings","booleans","alerts","numbers"], answer: "alerts"},
    {question: "the condition if an if / else statement is enclosed with ______.", responses: ["quotes","curly brackets","parenthesis","square brackets"], answer: "parenthesis"},
    {question: "arrays in javascript can be used to store _______.", responses: ["numbers and strings","other arrays","booleans","all of the above"], answer: "all of the above"},
    {question: "string values must be enclosed within ______ when being assigned to variables.", responses: ["commas","curly brackets","quotes","parenthesis"], answer: "quotes"},
    {question: "a very useful tool used during development and debugging for printing content to the debugger is:", responses: ["javascript","terminal/bash","for loops","console.log"], answer: "console.log"},
]

function displayQuestion() {
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
}

function answerOnClick(event) {
    console.log(event.target.textContent)
    if (event.target.textContent === questions[questionNumber].answer) {
        console.log("correct");
    } else {
        //reduce time
        console.log("incorrect");
    }
    questionNumber++
    displayQuestion()
    
}


// what's left:
// add start up and ending screen
// add clock
// add clock