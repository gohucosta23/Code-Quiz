
// I used an object array to store all the questions and answers

var questionArr = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<js>", "<script>", "<scripting>", "<javascript>", "none of the above"],
        correctAnswer: 1
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        choices: ["The <head> section", "Both the <head> and the <body> section are correct", "the <body> section", "I don't know",  "none of the above"],
        correctAnswer:  1
    },
    {
        question: "What is the correct syntax for referring to an external script called xxx.js?",
        choices: ["<script name =xxx.js> ", "<script src =xxx.js>", "<script href =xxx.js>", "none of the above"],
        correctAnswer: 1
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choices: ["alertBox('hello World')", "msgBox('hello World')", "alert('hello World')", "msg('hello World')", "none of the above"],
        correctAnswer: 2
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function myfunction()", "function: myfunction()", "function = myfunction()", "I don't know"],
        correctAnswer: 0
    }];

// GLobal variables used in the program

var score = 0;
var time = 1;
var timer = 1;
var stopInterval;
var startBtn = document.getElementById("startBtn");
var questionWrong = document.getElementById("wrongQuestionMessage");
var startOverBtn = document.getElementById("startOver");
var highScore = [];
var gameOverScore = document.getElementById("gameOverScore");
var getScore = document.getElementById("scoreGrid");
var currentQuestionIndex = 0;
// var correctAnswer = questionArr[currentQuestionIndex].correctAnswer;
var quizInterval;
document.getElementById("gameOver").classList.add("hide");



// generates the timer for the start countdown and the quiz countdown

startBtn.addEventListener("click", function () {

    stopInterval = setInterval(function () {
        time--;
        startBtn.textContent = "Your quiz starts in " + time;
        if (time === 0) {
            clearInterval(stopInterval);

            document.getElementById("hide1").classList.add("hide")
            document.getElementById("quizBox").classList.remove("hide");
            
           

            quizInterval = setInterval(quizTimer, 1000);
        }
    }, 1000);

    populateQuestion();
})
// This function runs the timer for the quiz questions
function quizTimer() {
    timer--;
    var minutes = Math.floor(timer / 60);
    var seconds = timer % 60;
    var time = document.getElementById("countDown");
    time.innerText = minutes + ":" + seconds;
    if (seconds < 10){
        time.textContent = minutes + ":0" + seconds;
    }
    if(timer === 0 || timer < 0){
        gameover();
    }
}
// Adding each question to the corresponding HTML tag, looping through the answers, and 
// creating a new button for every answer

function populateQuestion() {

    document.getElementById("question").textContent = "Q" + (currentQuestionIndex + 1) + ": " + questionArr[currentQuestionIndex].question;
    var buttons = document.getElementById("buttonsDisplay");
    buttons.textContent = "";

    for (var i = 0; i < questionArr[currentQuestionIndex].choices.length; i++) {
        var button = document.createElement("button");
        button.innerText = questionArr[currentQuestionIndex].choices[i];
        button.className = "btn rounded bg-primary choices";
        button.answerIndex = i;
        button.addEventListener("click", clickAnswer);
        buttons.appendChild(button);
    }
}
// This function validates the answer to check if it is the correct answer.

function clickAnswer() {
    
    questionWrong.textContent = "";
    var isCorrect = false;
    if (questionArr[currentQuestionIndex].correctAnswer === this.answerIndex) {
        isCorrect = true;
    }

    if (isCorrect) {
        score += 10;
        nextQuestion();
    }
    else {
        timer -= 15;
        var questionWrongMessage = document.createElement("div");
        questionWrongMessage.textContent = "WRONG ANSWER!!!";
        questionWrong.appendChild(questionWrongMessage);
        nextQuestion();
    }
}




function nextQuestion() {
    if (currentQuestionIndex < (questionArr.length - 1)) {
        currentQuestionIndex++;
        populateQuestion();
    }
    else {
        score += timer;       
        document.getElementById("quizBox").classList.add("hide");
        document.getElementById("finalScore").classList.remove("hide");
        clearInterval(quizInterval);
    }
}
function gameover(){
        
        gameOverScore.innerHTML = score;
        document.getElementById("quizBox").classList.add("hide");
        document.getElementById("finalScore").classList.add("hide");
        document.getElementById("gameOver").classList.remove("hide");
}

startOverBtn.addEventListener("click", function (){
    
    score = 0;
    time = 6;
    timer = 120;
    currentQuestionIndex = 0;

    document.getElementById("quizBox").classList.remove("hide");
    document.getElementById("finalScore").classList.add("hide");
    document.getElementById("gameOver").classList.add("hide");

})



document.getElementById("addScore").addEventListener("click", function () {

    
    var myscore = {
        initials: document.getElementById("initials").value,
        score: score
    };
    var highScores = JSON.parse(localStorage.getItem("highScore"));
    if (highScores != null) {
        highScore = highScores;
    }
    
    localStorage.setItem("highScore", JSON.stringify(highScore));
    highScore.push(myscore);
    var showScore = document.createElement("li");
    showScore.textContent = "Initials :" + myscore.initials + "  Your score was : " + score + " YOU ROCK!!!";    
    var scoreGrid = document.getElementById("scoreGrid")
    scoreGrid.appendChild(showScore);
    yourScore.textContent = score;
    

    localStorage.setItem("highScore", JSON.stringify(highScore));
});