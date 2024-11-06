const message = document.getElementById('info');
const reactionTimeDisplay = document.getElementById('reactionTime');
const beepSound = document.getElementById('beep-sound');

let startTime;
let timeout;

let reactionTimes = [];

function audtioryReactionTimeTest() {
    if (startTime) {
        const reactionTime = Date.now() - startTime; // Calculate reaction time
        reactionTimeDisplay.textContent = `Din reaktionstid är ${reactionTime} ms`;
        message.textContent = "";
        startTime = null; // Reset start time for the next test
        clearTimeout(timeout); // Clear timeout to avoid overlapping sounds
        reactionTimes.push(reactionTime); // Save reaction time
        if(reactionTimes.length === 5){
            const sum = reactionTimes.reduce((a, b) => a + b, 0);
            const average = sum / reactionTimes.length;
            message.textContent = `Ditt resultat är ${reactionTimes.join(" ms, ")} ms. Medelvärdet är ${average.toFixed(2)} ms`;
            document.removeEventListener('keydown', audtioryReactionTimeTest);
        }
    }else {
        reactionTimeDisplay.textContent = "";
        message.textContent = "Vänta på ljudet...";

        // Set a random delay between 2 to 5 seconds
        const delay = Math.floor(Math.random() * 3000) + 2000;

        // Clear any existing timeout
        clearTimeout(timeout);

        // Set timeout for beep sound
        timeout = setTimeout(() => {
            beepSound.play(); // Play beep sound
            startTime = Date.now(); // Record the start time
        }, delay);

        }
}

document.addEventListener('keydown', audtioryReactionTimeTest);
