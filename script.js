// Grab the important elements from the page
const textarea = document.getElementById("typingArea");
const startBtn = document.getElementById("startBtn");
const wpmDisplay = document.getElementById("wpmCount");
const statusDisplay = document.getElementById("status");
const timerDisplay = document.getElementById("timer");

// Keep track of what's going on
let startTime;
let mainTimer;           // For stopping typing after 20s
let countdownTimer;      // For ticking seconds countdown
let isTestRunning = false;

startBtn.addEventListener("click", () => {
  
  // Start the test
  if (!isTestRunning) {
    isTestRunning = true;
    startBtn.textContent = "Reset";

    // Reset everything before we begin
    textarea.value = "";
    textarea.disabled = false;
    textarea.focus();

    wpmDisplay.textContent = "WPM: --";
    statusDisplay.textContent = "🕸️ Type like a superhero!";
    timerDisplay.textContent = "Time: 20s";
    timerDisplay.classList.remove("warning");

    // Begin countdown and typing time
    let secondsLeft = 20;
    startTime = Date.now();

    // Countdown tick every second
    countdownTimer = setInterval(() => {
      secondsLeft--;
      timerDisplay.textContent = `Time: ${secondsLeft}s`;

      // Make the timer red when it's urgent
      if (secondsLeft <= 5) {
        timerDisplay.classList.add("warning");
      }

      // Stop countdown at 0
      if (secondsLeft <= 0) {
        clearInterval(countdownTimer);
      }
    }, 1000);

    // After 20 seconds, stop typing
    mainTimer = setTimeout(() => {
      textarea.disabled = true;
      isTestRunning = false;
      startBtn.textContent = "Start";

      clearInterval(countdownTimer);

      // Calculate words per minute
      const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
      const typed = textarea.value.trim();
      const words = typed === "" ? [] : typed.split(/\s+/);
      const wordCount = words.length;
      const wpm = Math.round(wordCount / elapsedMinutes);

      wpmDisplay.textContent = `Your WPM: ${wpm}`;
      statusDisplay.textContent = "🕷️ Test Complete! Swing again?";

    }, 20000); // 20 seconds

  } 
  
  // If the test is already running, this acts as a reset
  else {
    clearTimeout(mainTimer);
    clearInterval(countdownTimer);

    isTestRunning = false;
    startBtn.textContent = "Start";

    // Reset UI and state
    textarea.disabled = true;
    textarea.value = "";
    wpmDisplay.textContent = "WPM: --";
    timerDisplay.textContent = "Time: 20s";
    timerDisplay.classList.remove("warning");
    statusDisplay.textContent = "🕷️ Test reset. Click Start to begin again.";
  }
});
