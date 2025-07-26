let isRunning = false;
let timer;
let secondsLeft = 0;

// Parse values from 3 inputs to total seconds
function parseInputs() {
  const h = parseInt(document.getElementById('hoursInput').value) || 0;
  const m = parseInt(document.getElementById('minutesInput').value) || 0;
  const s = parseInt(document.getElementById('secondsInput').value) || 0;

  // Validate ranges
  if (h < 0 || h > 99 || m < 0 || m > 59 || s < 0 || s > 59) {
    return NaN;
  }

  return h * 3600 + m * 60 + s;
}

// Update inputs from total seconds
function updateInputs(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  document.getElementById('hoursInput').value = h.toString().padStart(2, '0');
  document.getElementById('minutesInput').value = m.toString().padStart(2, '0');
  document.getElementById('secondsInput').value = s.toString().padStart(2, '0');
}

function startTimer() {
  if (!isRunning) {
    const totalSeconds = parseInputs();
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      alert("Please enter a valid time: Hours (0-99), Minutes (0-59), Seconds (0-59).");
      return;
    }

    secondsLeft = totalSeconds;
    isRunning = true;
    timer = setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft--;
        updateInputs(secondsLeft);
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
  secondsLeft = 0;              
  updateInputs(secondsLeft);     
}

// Initialize inputs on page load
window.onload = () => {
  const totalSeconds = parseInputs();
  secondsLeft = isNaN(totalSeconds) ? 50 * 60 : totalSeconds;
  updateInputs(secondsLeft);
};
