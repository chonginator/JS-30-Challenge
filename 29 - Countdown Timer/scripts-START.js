var countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

// Setup timers for buttons and input field
buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Stop page from reloading
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});

function timer(seconds) {
  // Clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      // Check if timer should be stopped
      if (secondsLeft < 0) {
        clearInterval(countdown);
        return;
      }
      displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(remainderSeconds) {
  const minutes = Math.floor(remainderSeconds / 60);
  const seconds = remainderSeconds % 60;
  // Display '0' in front of seconds when < 10
  const displaySeconds = ((seconds < 10) ? `0${seconds}` : seconds);
  const display = `${minutes}:${displaySeconds}`
  timerDisplay.textContent = display;
  // Update tab title
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  // Display 12-hour time instead of 24-hour time
  const displayHour = ((hour > 12) ? `${hour - 12}` : hour);
  const displayMinutes = ((minutes < 10) ? `0${minutes}` : minutes);
  endTime.textContent = `Be Back At ${displayHour}:${displayMinutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}
