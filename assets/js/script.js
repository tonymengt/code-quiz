var btnEl = document.querySelector(".btn");
var introEl = document.querySelector(".intro");
var contentEl = document.querySelector(".content");
var questionEl = document.querySelector(".question")
var answersEl = document.querySelector(".answers")

let randomQuestion, currentQuestionIndex

btnEl.addEventListener("click", startQuiz);

// var randomQuestion = []
// randomQuestion = questionObj=>{
//     for (var i = questionObj.length-1; i >0; i--) {
//         var rand = Math.floor(Math.random() * i);
//         var curr = questionObj[i];
//         questionObj[i] = questionObj[rand];
//         questionObj[rand] = curr;
//     }
//     return questionObj;
// }
// var currentQuestion =0



function startQuiz () {
    introEl.classList.add("hide");
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


function nextQuestion () {
    displayedQuestion(randomQuestion(questionObj)[currentQuestionIndex])
}

function displayedQuestion(questionObj){
    questionEl.textContent= questionObj.question
    for (var i =0; i<4; i++) {
        var option = document.createElement("li")
        option.textContent = questionObj.answers[i].options
        console.log(option)
        option.classList.add("options")
        option.addEventListener("click", selectAnswers)
        answersEl.appendChild(option)
    }
    // answersEl.textContent= questionObj.options

}

function selectAnswers (e) {

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