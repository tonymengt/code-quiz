var btnEl = document.querySelector(".btn");
var introEl = document.querySelector(".intro");
var contentEl = document.querySelector(".content");
var questionEl = document.querySelector(".question");
var answersEl = document.querySelector(".answers");
var bodyEl = document.querySelector("body");
var scoreEl = document.querySelector(".score")
var timerEl = document.querySelector("#timer")
var finalScoreEl = document.querySelector("#final-score")
var submitBtnEl = document.querySelector(".submit-btn")
var inputNameEl = document.querySelector(".enter-score")

var randomQuestion, currentQuestionIndex
var points = 0
var time = 60
var user = []




// determines what is next once a question is answered
function next (){
    currentQuestionIndex++
    if (questionObj.length-1<currentQuestionIndex){
        showScore()
    }
    if (!questionObj.question){
        return "quiz is over"
    }
    nextQuestion()
}

// will present the final score after answering all the questions or when the time runs out
function showScore() {
    contentEl.classList.add("hide")
    scoreEl.classList.remove("hide")
    finalScoreEl.classList.remove("hide")
    // timerEl.classList.add("hide")
    points = points+Math.floor(time/2)
    finalScoreEl.textContent = "Your final score is "+ points
    };

// will triger the start of the quiz
function startQuiz () {
    introEl.classList.add("hide");
    countDown ()
    randomQuestion = questionObj => {
        for (var i = questionObj.length-1; i >0; i--) {
            var rand = Math.floor(Math.random() * i);
            var curr = questionObj[i];
            questionObj[i] = questionObj[rand];
            questionObj[rand] = curr;
        }
        return questionObj;
    }
    // console.log(randomQuestion(questionObj))
    currentQuestionIndex = 0;

    contentEl.classList.remove("hide");
    nextQuestion();
}

// tracks how much time is left for the quiz
function countDown(){
    timerEl.textContent=time
    var timeInterval = setInterval(function(){
        if(time >= 0){
            time--
            timerEl.textContent = time
        }

        else if (questionObj.length-1 < currentQuestionIndex){
            showScore()
        }
        else{
            showScore()
        }
        
    },1000)
    clearInterval(timeInterval)
}

// determine what the next question is
function nextQuestion () {
    // resetChoices()
    displayedQuestion(randomQuestion(questionObj)[currentQuestionIndex])
}

// present the current question
function displayedQuestion(questionObj){
    questionEl.textContent = questionObj.question
    while (answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild)
    }
    for (var i =0; i<4; i++) {
        var option = document.createElement("li")
        option.textContent = questionObj.answers[i].options
        option.classList.add("options")
        answersEl.appendChild(option)
        if (questionObj.answers[i].correct === true) {
            option.dataset.correct = "correct"
        }
        option.addEventListener("click", selectAnswers)
    }
    
    // answersEl.textContent= questionObj.options
}

// function resetChoices (){
//     while (answersEl.firstChild) {
//         answersEl.removeChild(answersEl.firstChild)
//     }
// }

// element.setAttribute('class', 'className');
//   setTimeout(function () {
//     feedbackEl.setAttribute('class', 'hide');
//   }, 5000);

// will track which answer the user have selected and points are added
function selectAnswers (event) {
    var selectedAnswer = event.target
    var checkAnswer = selectedAnswer.dataset.correct
    if (checkAnswer === "correct"){
        points = points + 5
    } else {
        time= time -10
    }
}

function score1(event) {
    console.log(inputNameEl.name)
    event.preventDefault()
    // var currScore = JSON.parse(localStorage.getItem("user"))
    // if (currScore)
        var score = {
            name: inputNameEl.value.trim(),
            points
        }
    user.push(score)
    console.log(user)
    localStorage.setItem("user", JSON.stringify(user))
    leaderBoard()
    } 

function leaderBoard()
// question the quiz will filter through
var questionObj = [
    {
        question:"Inside which HTML element do we put the JavaScript?",
        answers: [
            {options:"<js>", correct: false},
            {options:"<script>", correct: true},
            {options:"<scripting>", correct: false},
            {options:"<javascript>", correct: false}
       ]
    },
    {
        question:"tes2?",
        answers: [
            {options:"<js>", correct: false},
            {options:"<script>", correct: true},
            {options:"<scripting>", correct: false},
            {options:"<javascript>", correct: false}
       ]
    },
    {
        question:"Inside whicipt?",
        answers: [
            {options:"<js>", correct: false},
            {options:"<script>", correct: true},
            {options:"<scripting>", correct: false},
            {options:"<javascript>", correct: false}
       ]
    },
    {
        question:"Where is the correct place to insert a JavaScript?",
        answers: [
            {options:"The start of the <head>", correct: false},
            {options:"The end of the <body>", correct: true},
            {options:"After the <style>", correct: false},
            {options:"None of the above", correct: false}
       ]
    }
]

btnEl.addEventListener("click", startQuiz);
answersEl.addEventListener("click", next);
submitBtnEl.onclick = score1