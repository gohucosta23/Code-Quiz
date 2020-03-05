
var startBtn = document.getElementById("startBtn");
var questionArr = [
    {
        question: "What is your name?",
        choices: ["Steve", "kevin", "peter", "jimmy"],
        correctAnswer: 0
    },
    {
        question: "What is your age?",
        choices: ["10", "20", "25", "40"],
        correctAnswer: 0
    },
    {
        question: "What is your last name?",
        choices: ["Costa", "Clavin", "whatever", "vaicagar"],
        correctAnswer: 0
    },
    {
        question: "What is your favorite food?",
        choices: ["caldo", "strogonoff", "churrasco", "hamburger"],
        correctAnswer: 0
    },
    {
        question: "What is your favorite team?",
        choices: ["mengao", "vasco", "fluminense", "botafogo"],
        correctAnswer: 0
    }];

var score = 0;
var time = 1;
var timer = 300;
var stopInterval;
var startBtn = document.getElementById("startBtn");
var nextBtn = document.getElementById("nextBtn");
var currentQuestionIndex = 0;
var quizInterval;

startBtn.addEventListener("click", function () {

    stopInterval = setInterval(function () {
        time--;
        startBtn.textContent = "Your quiz starts in " + time;
        if (time === 0) {
            clearInterval(stopInterval);

            document.getElementById("hide1").classList.add("hide")
            document.getElementById("quizBox").classList.remove("hide");
            document.getElementById("navigationBox").classList.remove("hide");

            quizInterval = setInterval(quizTimer, 1000);
        }
    }, 1000);

    populateQuestion();
})

function quizTimer() {
    timer--;
    var minutes = Math.floor(timer / 60);
    var seconds = timer % 60;
    document.getElementById("countDown").innerText = minutes + ":" + seconds;
}

function populateQuestion() {

    document.getElementById("questions").innerText = "Q" + (currentQuestionIndex + 1) + ": " + questionArr[currentQuestionIndex].question;
    var buttons = document.getElementById("buttons");
    buttons.innerHTML = "";

    for (var i = 0; i < questionArr[currentQuestionIndex].choices.length; i++) {
        var button = document.createElement("button");
        button.innerText = questionArr[currentQuestionIndex].choices[i];
        button.className = "btn rounded bg-primary choices";
        button.answerIndex = i;
        button.addEventListener("click", clickAnswer);
        buttons.appendChild(button);
    }
}

function clickAnswer() {
    var isCorrect = false;
    if (questionArr[currentQuestionIndex].correctAnswer == this.answerIndex) {
        isCorrect = true;
    }

    if (isCorrect) {
        score += 10;
        nextQuestion();
    }
    else {
        timer -= 15;
    }
}

function nextQuestion() {
    if (currentQuestionIndex < (questionArr.length - 1)) {
        currentQuestionIndex++;
        populateQuestion();
    }
    else {
        score += timer;
        document.getElementById("navigationBox").classList.add("hide");
        document.getElementById("quizBox").classList.add("hide");
        document.getElementById("finalScore").classList.remove("hide");
        clearInterval(quizInterval);
    }
}

nextBtn.addEventListener("click", nextQuestion);

document.getElementById("addScore").addEventListener("click", function () {
    var myscore = {
        initials: document.getElementById("initials").value,
        score: score
    };

    var highScores = localStorage.getItem("highScores");
    if (highScores != null) {
        highScores = JSON.parse(highScores);
    }
    else {
        highScores = [];
    }

    highScores.push(myscore);
    var showScore = document.createElement("tr");
    myscore.textContent = showScore;

    localStorage.setItem("highScores", JSON.stringify(highScores));
});