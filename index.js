const greeter = document.getElementById('greeter');
const userInput = document.querySelector('.input-group');
const addNote = document.querySelector('.veri-note');
const playBtn = document.getElementById('play');
// const allBrs = document.querySelectorAll('br');
const bodyContainer = document.querySelector('.container');

// Welcome user to press the Play Button
playBtn.addEventListener('click', (event) => {
    startGame();
})

let currentQues = {};
let acceptAnswer = false;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

// Hard-Coded Questions for now
let questions = [
    {
        question: 'Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?',
        choice1: 'Apple',
        choice2: 'Microsoft',
        choice3: 'Atari',
        choice4: 'Commodore',
        answer: 'Apple',
    },
    {
        question: 'According to the International System of Units, how many bytes are in a kilobyte of RAM?',
        choice1: '512',
        choice2: '1024',
        choice3: '500',
        choice4: '1000',
        answer: '1000',
    },
    {
        question: 'Which computer language would you associate Django framework with?',
        choice1: 'C#',
        choice2: 'Java',
        choice3: 'Phyton',
        choice4: 'C++',
        answer: 'Phyton',
    },
];

// When the User ready to Play Trivia
startGame = () => {
    // console.log('In the Game')
    greeter.remove();
    userInput.remove();
    addNote.remove();
    playBtn.remove();

    questionCount = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    newQuestion();
}

// Display a New Question
newQuestion = () => {
    if (availableQuestions.length === 0 || questionCount >= 3) {
        return endGame();
    }

    questionCount++;

    // Score Tracker
    const scoreCount = document.createElement('h1');
    scoreCount.className = 'score-tracker';
    scoreCount.innerText = score;
    
    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'tracker';
    scoreDiv.innerHTML = `<p class="text-muted" style="text-align: center;">score</p>`;
    scoreDiv.appendChild(scoreCount);

    // Initiate random question selections
    let randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQues = availableQuestions[randomIndex];
    
    // Create <div class="container">
    let divContainer = document.createElement('div');
    divContainer.className = 'card border-success mb-3';
    divContainer.style.width = '25rem';
    divContainer.innerHTML = `
        <div class='card-header'>
            ${currentQues.question}
        </div>
        <ul class='list-group list-group-flush'>           
            <li class='list-group-item'> &nbsp; ${currentQues.choice1}</li>
            <li class='list-group-item'> &nbsp; ${currentQues.choice2}</li>      
            <li class='list-group-item'> &nbsp; ${currentQues.choice3}</li>      
            <li class='list-group-item'> &nbsp; ${currentQues.choice4}</li>
        </ul>
    `;

    // Question Count Tracker
    const questionTracker = document.createElement('p');
    questionTracker.className = 'question-tracker text-muted';
    questionTracker.innerHTML = `${questionCount} / 3`;

    // Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress';
    progressBar.innerHTML = `
        <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="${questionCount/3 * 100}" aria-valuemin="0" aria-valuemax="100" style="width: ${questionCount/3 * 100}%"></div>
    `;

    bodyContainer.append(scoreDiv, divContainer, questionTracker, progressBar);
    
    // Remove/Delete the question that is currently shown from the Questions Array
    availableQuestions.splice(randomIndex, 1);

    // Allow the user to accept an answer
    acceptAnswer = true;
    checkAnswer();
}

// Accept User Selection and Check Answer
checkAnswer = () => {
    const selections = Array.from(document.getElementsByClassName('list-group-item'));
    
    selections.forEach((selection) => {
        selection.addEventListener('click', (event) => {
            // If we are not ready accepting answer
            if (!acceptAnswer) return;

            // The user can only click/answer once
            acceptAnswer = false;

            const userAnswer = event.target;
            
            // Setting up conditionals to check if the Answer is correct or incorrect
            const addClass = (userAnswer.innerText.trim() === currentQues.answer) ? "correct" : "incorrect";

            // Update Score Count
            if (addClass === "correct") score += 1;

            userAnswer.classList.add(addClass);
            // console.log(userAnswer);

            setTimeout( () => {
                // Update Card         
                const oldDiv = document.querySelector('.card.border-success.mb-3');
                oldDiv.remove();

                // Update Score Count
                const oldScore = document.querySelector('#tracker');
                oldScore.remove();

                // Update Question Tracker 
                const oldQuestionTracker = document.querySelector('.question-tracker');
                oldQuestionTracker.remove();

                // Update Progress bar
                const oldProgressBar = document.querySelector('.progress');
                oldProgressBar.remove();

                // Create New Question
                newQuestion();
            }, 1000)
            
        })
    })
}

// Summary of End Game
endGame = () => {
    // Final Score
    const endGameSummary = document.createElement('h1');
    endGameSummary.className = 'score-tracker';
    endGameSummary.innerText = score;

    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'tracker';
    scoreDiv.innerHTML = `<p class="text-muted" style="text-align: center;">score</p>`;
    scoreDiv.appendChild(endGameSummary);

    // Set Up Conditionals for Higher Score 


    // Button for 'Play Again'
    const endGameBtns = document.createElement('div');
    endGameBtns.className = 'd-grid gap-2';
    endGameBtns.style.width = '25rem';
    endGameBtns.innerHTML = `
        <button type="button" class="btn btn-outline-success" id="replay">Play Back</button>
        <button type="button" class="btn btn-outline-secondary id="home">Home</button>
    `;
    
    bodyContainer.append(scoreDiv, endGameBtns);
    
    endGameBtns.addEventListener('click', (event) => {
        if (event.target.innerText === "Play Back") {
            // Delete existing page buttons
            scoreDiv.remove();
            endGameBtns.remove();

            startGame();
        } else {
            window.history.go();
        }
    }) 
}