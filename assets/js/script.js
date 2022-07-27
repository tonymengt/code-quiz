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
    console.log("hi")
    currentQuestionIndex++
    if (questionObj.length-1<currentQuestionIndex){
        // clearInterval(timeInterval)
        showScore()
    }else {displayedQuestion()}
    // nextQuestion()
    // if (!questionObj.question){
    //     return "quiz is over"
    // }
    
}

// will present the final score after answering all the questions or when the time runs out
function showScore() {
    contentEl.classList.add("hide")
    scoreEl.classList.remove("hide")
    finalScoreEl.classList.remove("hide")
    timerEl.classList.add("hide")
    // timerEl.classList.add("hide")
    
    points = points+Math.floor(time/2)
    clearInterval(timeInterval)
    finalScoreEl.textContent = "Your final score is "+ points
    };

   

// will triger the start of the quiz
function startQuiz () {
    questionObj = randomQuestion(questionObj)
    introEl.classList.add("hide");
    leaderBoardEl.classList.add("hide");
    countDown ()
    // console.log(randomQuestion(questionObj))
    currentQuestionIndex = 0;
    time = 60;
    points = 0;
    contentEl.classList.remove("hide");
    displayedQuestion()
    // nextQuestion();
}

// tracks how much time is left for the quiz
function countDown(){
    timerEl.textContent=time
    timeInterval = setInterval(function(){
        if(time >= 0){
            time--
            timerEl.textContent = time
        }
        // else if (questionObj.length-1 < currentQuestionIndex){
        //     clearInterval(timeInterval)
        //     showScore()
        // }
        else{
            clearInterval(timeInterval)
            showScore()
        }

    },1000)
    
}

// // determine what the next question is
// function nextQuestion () {
//     // resetChoices()
//     displayedQuestion()
//     // randomQuestion[currentQuestionIndex]
//     console.log(currentQuestionIndex)
// }

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

function score(event) {
    console.log(inputNameEl.name)
    event.preventDefault()
    // var currScore = JSON.parse(localStorage.getItem("user"))
    // if (currScore)
        var score = {
            name: inputNameEl.value.trim(),
            points
        }
    user.push(score)
    localStorage.setItem("user", JSON.stringify(user))

    leaderBoard()
    } 

function leaderBoard(){
    var currScore = JSON.parse(localStorage.getItem("user"))
    var leaderBoardListEl = document.createElement("li")
    leaderBoardListEl.className = "leader-board-list"
    leaderBoardListEl.remove()
    // console.log(currScore)
    for (var i = 0; i < currScore.length; i++){
        leaderBoardListEl.innerHTML = "<li>" + currScore[i].name +": "+ currScore[i].points +"</li>"
        console.log(leaderBoardListEl)
        leaderListEl.appendChild(leaderBoardListEl)
    }
    sort()
    scoreEl.classList.add("hide")
    leaderBoardEl.classList.remove("hide")
}

function sort () {
        var leaderListEl, run, li, stop;

        // Taking content of list as input
        leaderListEl = document.querySelector(".leader-list");

        run = true;

        while (run) {
            run = false;
            li = leaderListEl.getElementsByTagName("LI");

            // Loop traversing through all the list items
            for ( var i = 0; i < (li.length - 1); i++) {
                stop = false;
                if (li[i].points > li[i+1].points) {
                    stop = true;
                    break;
                }
            }

            /* If the current item is smaller than 
               the next item then adding it after 
               it using insertBefore() method */
            if (stop) {
                li[i].parentNode.insertBefore(
                        li[i + 1], li[i]);

                run = true;
            }
        }
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
submitBtnEl.addEventListener("click", score);
playAgainEl.addEventListener("click", startQuiz);
homeMenuEl.addEventListener("click", function (){
    leaderBoardEl.classList.add("hide")
    introEl.classList.remove("hide")
})
