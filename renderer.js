let isRunning = false;
let timer;
let secondsLeft = 50 * 60;

function updateDisplay() {
  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');
  document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        alert("Time's up! Take a break.");
      }
    }, 1000);
  }
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timer);
}

function resetTimer() {
  isRunning = false;
  clearInterval(timer);
  secondsLeft = 50 * 60;
  updateDisplay();
}

updateDisplay(); // Set initial display
