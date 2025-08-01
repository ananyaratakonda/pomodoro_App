let isRunning = false;
let timer;
let secondsLeft = 0;
let imageInterval;

// Array of image paths
const images = [
  'assets/flower1.png',
  'assets/flower2.png',
  'assets/flower3.png',
  'assets/flower4.png',
  'assets/flower5.png'
];

let currentImageIndex = 0;

// Function to cycle images
function changeImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  const img = document.getElementById('backgroundImage');
  img.src = images[currentImageIndex];
}

// Parse input values
function parseInputs() {
  const h = parseInt(document.getElementById('hoursInput').value) || 0;
  const m = parseInt(document.getElementById('minutesInput').value) || 0;
  const s = parseInt(document.getElementById('secondsInput').value) || 0;

  if (h < 0 || h > 99 || m < 0 || m > 59 || s < 0 || s > 59) {
    return NaN;
  }

  return h * 3600 + m * 60 + s;
}

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

    // Start main countdown
    timer = setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft--;
        updateInputs(secondsLeft);
      } else {
        clearInterval(timer);
        clearInterval(imageInterval);
        isRunning = false;
        alert("Time's up! Take a break.");
      }
    }, 1000);

    // Start image change interval (every 5 minutes = 300,000 ms)
    imageInterval = setInterval(changeImage, 1 * 60 * 1000);
  }
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timer);
  clearInterval(imageInterval);
}

function resetTimer() {
  isRunning = false;
  clearInterval(timer);
  clearInterval(imageInterval);
  secondsLeft = 0;
  updateInputs(secondsLeft);
  currentImageIndex = 0;
  document.getElementById('backgroundImage').src = images[0]; // reset to first image
}

window.onload = () => {
  const totalSeconds = parseInputs();
  secondsLeft = isNaN(totalSeconds) ? 50 * 60 : totalSeconds;
  updateInputs(secondsLeft);

  ['hoursInput', 'minutesInput', 'secondsInput'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      pauseTimer();
    });
  });
};
