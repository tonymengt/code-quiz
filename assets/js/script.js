var btnEl = document.querySelector(".btn");
var introEl = document.querySelector(".intro");
var contentEl = document.querySelector(".content");
var questionEl = document.querySelector(".question");
var answersEl = document.querySelector(".answers");
var bodyEl = document.querySelector("body");
var scoreEl = document.querySelector(".score")
var timerEl = document.querySelector("#timer")
var finalScoreEl = document.querySelector("#final-score")
var submitBtnEl = document.querySelector(".submit-button")

var randomQuestion, currentQuestionIndex
var points =0
var time = 60

btnEl.addEventListener("click", startQuiz);
answersEl.addEventListener("click", next);
submitBtnEl.addEventListener("click", submitScore);



function next (){
    currentQuestionIndex++
    if (questionObj.length-1<currentQuestionIndex){
        showScore()

    } else {
    nextQuestion()
    }
}

function showScore() {
    contentEl.classList.add("hide")
    scoreEl.classList.remove("hide")
    finalScoreEl.classList.remove("hide")
    timerEl.classList.add("hide")
    points = points+Math.floor(time/2)
    finalScoreEl.textContent = "Your final score is "+ points
    // need to add score calculation to determine if it'll be placed within the top score
}

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

function countDown(){
    timerEl.textContent=time
    var timeInterval = setInterval(function(){
        if(time>0){
            time--
            timerEl.textContent = time
        }
        else if (questionObj.length-1<currentQuestionIndex){
            clearInterval(timeInterval)
            showScore()
        }
        else{
            clearInterval(timeInterval)
            showScore()
        }
        
    },1000)

}

function nextQuestion () {
    // resetChoices()
    displayedQuestion(randomQuestion(questionObj)[currentQuestionIndex])
}

function displayedQuestion(questionObj){
    questionEl.textContent = questionObj.question
    while (answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild)
    }
    for (var i =0; i<4; i++) {
        var option = document.createElement("li")
        option.textContent = questionObj.answers[i].options
        console.log(option)
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

function selectAnswers (event) {
    var selectedAnswer = event.target
    var checkAnswer = selectedAnswer.dataset.correct
    if (checkAnswer === "correct"){
        points = points + 5
    } else {
        time= time -10
    }
    console.log(points)
}

function submitScore (event) {
    var submitPoint = event.target
    
}

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