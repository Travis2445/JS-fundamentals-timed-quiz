// JavaScript


// formatting for #quiz-body
const quizBodyEl = document.querySelector("#quiz-body");
quizBodyEl.classList.add("d-flex", "flex-column", "min-vh-100", "justify-content-center", "align-items-center", "bg-dark")

// Array of the quiz questions, the choices to choose from, and the correct answer
const questions = [
    {
        title: "Which of the following is true about typeof operator in JavaScript?",
        choices: ["The typeof is a unary operator that is placed before its single operand, which can be of any type.", "Its value is a string indicating the data type of the operand.", "Both of the above.", "None of the above."],
        answer: "Both of the above."
    },
    {
        title: "Which of the following is a valid type of function javascript supports?",
        choices: ["named function", "anonymous function", "Both of the above.", "None of the above."],
        answer: "Both of the above."
    },
    {
        title: "Which of the following type of variable is visible only within a function where it is defined?",
        choices: ["global variable", "local variable", "Both of the above.", "None of the above."],
        answer: "local variable"
    },
    {
        title: "Which built-in method sorts the elements of an array?",
        choices: ["changeOrder(order)", "order()", "sort()", "None of the above."],
        answer: "sort()"
    },
    {
        title: "Which of the following function of String object returns the character at the specified index?",
        choices: ["charAt()", "charCodeAt()", "concat()", "indexOf()"],
        answer: "charAt()"
    }
]

// Declaring the numerical values of my score and timer functions
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;
const timerEl = document.querySelector("#timer-toggle");


// After start is clicked, the timer begins to count down
function start() {
    // make the timer visible when begin button is clicked
    timerEl.classList.replace("d-none", "d-block");

    timeLeft = 100;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;

        // If timer hits below 0, the game ends
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    
    }, 1000);
    
    next();
}

// The game ends when the timer is stopped or they've answered all of the questions
function endGame() {
    clearInterval(timer);

    var quizContent = `
        <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center bg-dark">
        <h2 class="text-white">Game over!</h2>
        <h3 class="text-white">You got a ` + score + ` /100!</h3>
        <h3 class="text-white">That means you got ` + score / 20 + ` questions correct!</h3>
        <input type="text" id="name" required="required" placeholder="Enter your name.">
        <button class="btn btn-light mt-1" onclick="setScore()">Set score!</button>
        </div>`;

        document.getElementById("quiz-body").innerHTML = quizContent;
}

//Adds score to local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}

function getScore() {
    var quizContent = `
    <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center bg-dark">
    <h2 class="text-white">` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1 class="text-white">` + localStorage.getItem("highscore") + `</h1><br>
    <button class="btn btn-danger" onclick="clearScore()">Clear HighScore</button>
    <button class="btn btn-light mt-1" onclick="resetGame()">Play again!</button>
    </div>
    
    `;

    document.getElementById("quiz-body").innerHTML = quizContent;
}

//Clears the score name and value in the local storage if the user selects "clear highscore"
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

//Reset the quiz
function resetGame() {
    timerEl.classList.replace("d-block", "d-none");

    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center bg-dark">
        <h1 class="text-white display-3">another <a href="https://www.javascript.com/" class="text-decoration-none"><span class="text-dark bg-warning ">JS</span></a> quiz</h1>
        <p class="lead text-light">a simple JavaScript quiz built using HTML, CSS, JavaScript, and Bootstrap.</p>
        <div>
            <button class="btn btn-light btn-width" onclick="start()">begin</button>
            <a class="highscoreLink" onclick="getScore()" href="#"><button class="btn btn-light btn-width">highScore</button></a>
        </div>
    </div>`;

    document.getElementById("quiz-body").innerHTML = quizContent;

}

//Deduct 10 seconds from the timer if user guesses wrong
function incorrect() {
    timeLeft -=10;
    next();
}

//Increase the score by 25 if the user guesses right
function correct() {
    score += 25;
    next()
}

// This function loops through the questions
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2 class='text-white text-center'>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {        
        var buttonCode = "<button class='btn btn-light my-1' onclick=\"[ANS]\">[CHOICE]</button>";         
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);        
        
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {           
             buttonCode = buttonCode.replace("[ANS]", "correct()");        
        } else { 
               buttonCode = buttonCode.replace("[ANS]", "incorrect()");       
            }        
             quizContent += buttonCode   
    }
    
    document.getElementById("quiz-body").innerHTML = quizContent;
}
