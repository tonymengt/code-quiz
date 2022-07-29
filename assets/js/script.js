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
var leaderEl = document.querySelector(".leader")
var leaderBoardEl = document.querySelector(".leaderboard")
var leaderListEl = document.querySelector(".leader-list")
var playAgainEl = document.querySelector(".play-again")
var homeMenuEl = document.querySelector(".home-menu")
var leaderBoardListEl = document.querySelector(".leader-board-list")
var solutionEl = document.querySelector(".solution")
var navEl = document.querySelector(".navigation")

var randomQuestion = questionObj => {
    for (var i = questionObj.length-1; i >0; i--) {
        var rand = Math.floor(Math.random() * i);
        var curr = questionObj[i];
        questionObj[i] = questionObj[rand];
        questionObj[rand] = curr;
    }
    return questionObj;
}

var currentQuestionIndex
var points = 0
var time = 60
var user = []
var timeInterval = null



// determines what is next once a question is answered
function next (){
    currentQuestionIndex++
    if (questionObj.length-1<currentQuestionIndex){
        showScore()
    }else {displayedQuestion()}
}

// will present the final score after answering all the questions or when the time runs out
function showScore() {
    document.querySelector(".enter-score").value =""
    document.querySelector(".check-answer").classList.remove("hide")
    contentEl.classList.add("hide")
    scoreEl.classList.remove("hide")
    finalScoreEl.classList.remove("hide")
    timerEl.classList.add("hide")
    if (checkAnswer === "correct"){
        document.querySelector(".check-answer").textContent = "Correct"
        document.querySelector(".check-answer").style.color = "rgb(34, 171, 52)"
    } else {
        document.querySelector(".check-answer").textContent = "Wrong"
        document.querySelector(".check-answer").style.color = "rgb(151, 34, 34)"
    }
    points = points+Math.floor(time/2)
    clearInterval(timeInterval)
    finalScoreEl.textContent = "Your final score is "+ points + "."
    };

   

// will triger the start of the quiz
function startQuiz () {
    solutionEl.textContent= ""
    questionObj = randomQuestion(questionObj)
    navEl.classList.remove("hide")
    introEl.classList.add("hide");
    leaderBoardEl.classList.add("hide");
    timerEl.classList.remove("hide")
    countDown ()
    currentQuestionIndex = 0;
    time = 60;
    points = 0;
    contentEl.classList.remove("hide");
    displayedQuestion()
}

// tracks how much time is left for the quiz
function countDown(){
    timerEl.textContent=time
    timeInterval = setInterval(function(){
        if(time > 0){
            time--
            timerEl.textContent = time
        }
        else{
            clearInterval(timeInterval)
            showScore()
        }

    },1000)
    
}

// present the current question
function displayedQuestion(){
    questionEl.textContent = questionObj[currentQuestionIndex].question
    while (answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild)
    }
    for (var i =0; i<4; i++) {
        var option = document.createElement("li")
        option.textContent = questionObj[currentQuestionIndex].answers[i].options
        option.classList.add("options")
        answersEl.appendChild(option)
        if (questionObj[currentQuestionIndex].answers[i].correct === true) {
            option.dataset.correct = "correct"
        }
        option.addEventListener("click", selectAnswers)
    }
}

var checkAnswer=null
// will track which answer the user have selected and points are added
function selectAnswers (event) {
    bodyEl.className = ""
    solutionEl.textContent= ""
    
    var selectedAnswer = event.target
    checkAnswer = selectedAnswer.dataset.correct
    solutionEl.classList.remove("hide")
    if (checkAnswer === "correct"){
        points = points + 5
        time += 5
        solutionEl.textContent= "Correct"
        solutionEl.style.color = 'rgb(34, 171, 52)'
        // var answerInterval = setInterval (function (){
        //     var clock = 0.5
        //     bodyEl.className = ""
        //     solutionEl.textContent= ""
        //     clock--
        // },500)
    } else {
        time= time -5
        solutionEl.textContent= "Wrong"
        solutionEl.style.color = "rgb(151, 34, 34)"
        // var answerInterval = setInterval (function (){
        //     var clock = 0.5
        //     bodyEl.className = ""
        //     solutionEl.textContent= ""
        //     clock--
        // },500)
    }
}

// request player to store score to localStorage
function score(event) {
    event.preventDefault()
        var score = {
            name: inputNameEl.value.trim(),
            points
        }
    user.push(score)
    user.sort(function(a,b){
        return b.points - a.points
    })
    localStorage.setItem("user-score", JSON.stringify(user))
    leaderBoard()
    } 

    // display data from localStorage
function leaderBoard(){
    navEl.classList.add("hide")
    var currScore = JSON.parse(localStorage.getItem("user-score"))
    leaderListEl.innerHTML=""
    console.log(currScore)
    if (currScore==null){
        leaderListEl.innerHTML="<li class ='leader-board-list'> </li>"
    }else {
    for (var i = 0; i < currScore.length; i++){
        leaderListEl.innerHTML += "<li class ='leader-board-list'>" + currScore[i].name +": "+ currScore[i].points +"</li>"
    }}
    scoreEl.classList.add("hide")
    leaderBoardEl.classList.remove("hide")
    introEl.classList.add("hide")
}

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
        question:"How to write an IF statement in JavaScript?",
        answers: [
            {options:"if i=5 then", correct: false},
            {options:"if i=5", correct: false},
            {options:"if i ==5 then", correct: false},
            {options:"if (i==5)", correct: true}
       ]
    },
    {
        question:"How does a FOR loop start?",
        answers: [
            {options:"for (i=0; i<=5)", correct: false},
            {options:"for i=1 to 5", correct: false},
            {options:"for (i=0; i<=5; i++)", correct: true},
            {options:"for (i=0; i<=5; i+)", correct: false}
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
    },
    {
        question:"Which event occurs when the user clicks on an HTML element?",
        answers: [
            {options:"onclick", correct: true},
            {options:"onmouseover", correct: false},
            {options:"onmouseclick", correct: false},
            {options:"onchange", correct: false}
       ]
    },
    {
        question:"Which operator is used to assign a value to a variable?",
        answers: [
            {options:"-", correct: false},
            {options:"*", correct: false},
            {options:"X", correct: false},
            {options:"=", correct: true}
       ]
    },
    {
        question:"What will the following code return: Boolean(10 > 9)",
        answers: [
            {options:"true", correct: true},
            {options:"false", correct: false},
            {options:"NaN", correct: false},
            {options:"undefined", correct: false}
       ]
    },
    {
        question:"In the JavaScript, which one of the following is not considered as an error:",
        answers: [
            {options:"Missing of semicolons", correct: true},
            {options:"Syntax error", correct: false},
            {options:"Division by zero", correct: false},
            {options:"Missing of bracket", correct: false}
       ]
    },
    {
        question:"How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        answers: [
            {options:"if (i <> 5)", correct: false},
            {options:"if (i NOT 5)", correct: false},
            {options:"if (i != 5)", correct: true},
            {options:"if (i =! 5)", correct: false}
       ]
    },
    {
        question:"How do you write 'Hello World' in an alert box?",
        answers: [
            {options:"msgBox('Hello World')", correct: false},
            {options:"alert('Hello world')", correct: false},
            {options:"alertBox('hellow World')", correct: false},
            {options:"alert('Hello World')", correct: true}
       ]
    }
]

btnEl.addEventListener("click", startQuiz);
answersEl.addEventListener("click", next);
submitBtnEl.addEventListener("click", score);
playAgainEl.addEventListener("click", startQuiz);
homeMenuEl.addEventListener("click", function (){
    leaderBoardEl.classList.add("hide")
    navEl.classList.remove("hide")
    introEl.classList.remove("hide")
})
navEl.addEventListener("click", function (){
    clearInterval(timeInterval)
    contentEl.classList.add("hide")
    leaderBoard()
})
