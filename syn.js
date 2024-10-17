const testText = document.querySelector('#info');
const body =  document.querySelector('body');

let waitingForReaction = false;
let currentlyTesting = false;
let startTime;

let counter = 0;
let reaction_times = [];

function displayMessage(message) {
    console.log(testText)
    testText.textContent = message;
}

function startReactionTest() {
    displayMessage("Vänta på att bakgrunden ändras...");
    currentlyTesting = true;
    
    const delay = Math.random() * (5000 - 2000) + 2000;

    setTimeout(() => {
        body.classList.add('bg-red-600');
        startTime = Date.now();  // Record the start time
        waitingForReaction = true;
    }, delay);
}

// Event listener for keypress
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' ) {
        if(counter >= 5){
            reaction_times_string = "";
            for (let i = 0; i < reaction_times.length; i++) {
                reaction_times_string += `\n\n` + reaction_times[i] + " ms, ";
            }
            displayMessage("Testet är avklarat. Ditt resultat är " + reaction_times_string );

            currentlyTesting = false;
        }else {
            if (!waitingForReaction) {
                startReactionTest();  // Stasrt the test if not waiting
            } else if(waitingForReaction){
                const reactionTime = Date.now() - startTime;  // Calculate reaction time
                reaction_times.push(reactionTime);  // Add the reaction time to the array
                displayMessage(`Reaktionstid: ${reactionTime} ms`)
                counter++;
                setTimeout(() => 
                    {
                        displayMessage(`Test ${counter}/5 avklart. Klicka på Space för att börja nästa test.`);
                        waitingForReaction = false;  // Reset the test state
                        body.classList.remove('bg-red-600');

                    }, 
                2000);
    
    
            }
        }
       
    }
});         