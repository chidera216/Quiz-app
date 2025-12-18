//DOM Element
const timerEL = document.getElementById("timer")
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "Which language is mainly used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false },
    ],
  },
  {
    question: "What does 'JS' stand for in programming?",
    answers: [
      { text: "Java Source", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Just Script", correct: false },
      { text: "Jumbled Syntax", correct: false },
    ],
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "#", correct: false },
      { text: "/* */", correct: false },
      { text: "<!-- -->", correct: false},
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "In JavaScript, which keyword declares a variable?",
    answers: [
      { text: "Var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//EVENT LISTENER

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)


// START QUIZ FUNCTION
function startQuiz() {
        //Reset var
        currentQuestionIndex = 0
        score = 0
        scoreSpan.textContent = 0
        timeLeft = 15

        startScreen.classList.remove("active")
        quizScreen.classList.add("active")

        showQuestion()
        startTimer()
        timerEL.style.color = "#666"
}


// SHOW QUESTIONS
function showQuestion() {
        //Reset state
        // answersDisabled = true

        const currentQuestion = quizQuestions[currentQuestionIndex]

        currentQuestionSpan.textContent = currentQuestionIndex +1

        const progressPercent = (currentQuestionIndex/quizQuestions.length) * 100

        progressBar.style.width = progressPercent  + "%"

        questionText.textContent = currentQuestion.question

        answersContainer.innerHTML=""

        // SHOW ANSWER BUTTON
        currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button")
                button.textContent = answer.text
                button.classList.add("answer-btn")
                button.dataset.correct = answer.correct
                button.addEventListener("click", selectAnswer)
                answersContainer.appendChild(button)
        })
}

// from here

function startTimer() {
        timerEL.textContent = timeLeft
        timerInterval = setInterval(() => {
                timeLeft--;
                timerEL.textContent = timeLeft

                if (timeLeft <= 5) {
                        timerEL.style.color = "#f44336"
                }

                if (timeLeft <= 0) {
                        clearInterval(timerInterval)
                        showResult()
                }
        }, 1000)
}

function selectAnswer() {
        // if (answersDisabled) return answersDisabled = true

        const selectedButton = event.target;
        const isCorrect = selectedButton.dataset.correct === "true"

        Array.from(answersContainer.children).forEach((button) => {
                if (button.dataset.correct === "true") {
                        button.classList.add("correct")
                }else if(button === selectedButton){
                        button.classList.add("incorrect")
                }
        })

        if (isCorrect) {
                score++
                scoreSpan.textContent = score
        }

        setTimeout(() => {
                currentQuestionIndex++

                if (currentQuestionIndex < quizQuestions.length) {
                        showQuestion()
                }else{
                        showResult()
                        clearInterval(timerInterval)
                }
        }, 1000)
}

function showResult() {
        quizScreen.classList.remove("active")
        resultScreen.classList.add("active")

        finalScoreSpan.textContent = score

        const percentage = (score / quizQuestions.length) * 100;

        if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
        } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
        } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
        } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
        } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
        }
}

function restartQuiz() {
        resultScreen.classList.remove("active")
        timerEL.textContent = ""
        startTimer()
        clearInterval(timerInterval)
        startQuiz()

}

