let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let scoreDisplay = document.querySelector("#score");

let highScore = localStorage.getItem("highScore") || 0;
updateScore();

// Start game (keyboard + mobile tap)
document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame, { once: true });

function startGame() {
    if (!started) {
        started = true;
        levelUp();
    }
}

// Flash effect
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

// Level up
function levelUp() {
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);

    let randBtn = document.querySelector(`#${randColor}`);
    btnFlash(randBtn);
}

// Check answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            updateScore();
            setTimeout(levelUp, 800);
        }
    } else {
        gameOver();
    }
}

// Button press
function btnPress() {
    if (!started) return;

    let btn = this;
    btnFlash(btn);

    let userColor = btn.id;
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Game over
function gameOver() {
    let score = level - 1;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }

    h2.innerHTML = `Game Over! <br> Press any key to restart`;
    document.body.classList.add("game-over");

    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 300);

    resetGame();
}

// Reset
function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    updateScore();
}

// Score update
function updateScore() {
    let score = Math.max(0, level - 1);
    scoreDisplay.innerText = `Score: ${score} | High Score: ${highScore}`;
}


// Button listeners
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));
