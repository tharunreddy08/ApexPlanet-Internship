const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris",
        funFact: "Paris is known as the City of Light."
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
        funFact: "Mars is home to the tallest volcano in the solar system, Olympus Mons."
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean",
        funFact: "The Pacific Ocean is larger than all the landmasses on Earth combined."
    }
];

let currentQuestionIndex = 0;
let score = 0;
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result');
const scoreContainer = document.getElementById('score');
const funFactContainer = document.getElementById('fun-fact');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const progressBar = document.getElementById('progress-bar');
const timerContainer = document.getElementById('timer');
let timer;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <ul class="options">
            ${currentQuestion.options.map(option => `<li><input type="radio" name="option" value="${option}"> ${option}</li>`).join('')}
        </ul>
        `;
    resultContainer.textContent = '';
    scoreContainer.textContent = `Score: ${score}`;
    funFactContainer.textContent = '';
    progressBar.style.width = `${(currentQuestionIndex / quizData.length) * 100}%`;
    startTimer();
}

function startTimer() {
    let timeLeft = 10; 
    timerContainer.textContent = `Time left: ${timeLeft} seconds`;
    timer = setInterval(() => {
    timeLeft--;
    timerContainer.textContent = `Time left: ${timeLeft} seconds`;
    if (timeLeft <= 0) {
            clearInterval(timer);
            resultContainer.textContent = `Time's up! The correct answer is: ${quizData[currentQuestionIndex].answer}`;
            funFactContainer.textContent = quizData[currentQuestionIndex].funFact;
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                endQuiz();
            }
        }
    }, 1000);
}
nextButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        clearInterval(timer);
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestionIndex].answer) {
                resultContainer.textContent = "Correct!";
                score++;
            } else {
                resultContainer.textContent = `Wrong! The correct answer is: ${quizData[currentQuestionIndex].answer}`;
        }
        funFactContainer.textContent = quizData[currentQuestionIndex].funFact;
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
                    loadQuestion();
                } else {
                    endQuiz();
                }
            } else {
                alert("Please select an option!");
            }
        });

        function endQuiz() {
            resultContainer.textContent += " Quiz completed!";
            scoreContainer.textContent = `Final Score: ${score}`;
            nextButton.style.display = 'none';
            restartButton.style.display = 'inline-block';
        }

        restartButton.addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;
            nextButton.style.display = 'inline-block';
            restartButton.style.display = 'none';
            loadQuestion();
        });

    
        const jokeText = document.getElementById('joke-text');
        const jokeButton = document.getElementById('joke-button');

        jokeButton.addEventListener('click', async () => {
            try {
                const response = await fetch('https://official-joke-api.appspot.com/random_joke');
                const joke = await response.json();
                jokeText.textContent = `${joke.setup} - ${joke.punchline}`;
            } catch (error) {
                jokeText.textContent = "Failed to fetch a joke. Please try again.";
            }
        });

    
        loadQuestion();