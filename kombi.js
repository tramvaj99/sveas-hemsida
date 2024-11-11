const testText = document.querySelector('#info');
const body =  document.querySelector('body');

let waitingForReaction = false;
let currentlyTesting = false;
let startTime;

let counter = 0;
let reactions = [];

let direction_sound = []
let direction_text = []

const directions = [
    'left',
    'right',
    'up',
    'down'
];

const arrows = {
    left: 'vänster',
    right: 'höger',
    up: 'upp',
    down: 'ner'
}

const sounds = {
    left: 'assets/left.wav',
    right: 'assets/right.wav',
    up: 'assets/up.wav',
    down: 'assets/down.wav'
}



function displayMessage(message) {
    console.log(testText)
    testText.innerHTML = message;
}

// Function to populate the table

function startReactionTest() {
    displayMessage("Vänta...");
    currentlyTesting = true;
    
    // Set a random timeout between 2 to 5 seconds
    const delay = Math.random() * (5000 - 2000) + 2000;

    setTimeout(() => {
        let temp_direction = directions
        let random_direction_sound = temp_direction[Math.floor(Math.random() * temp_direction.length)];
        temp_direction = temp_direction.filter(item => item !== random_direction_sound);
        let random_direction_sign = temp_direction[Math.floor(Math.random() * temp_direction.length)];

        direction_sound.push(random_direction_sound)
        direction_text.push(random_direction_sign)
        
        const audio = new Audio(sounds[random_direction_sound]);
        audio.playbackRate=1.5;
        audio.play()
        setTimeout(() => {
            displayMessage(`${arrows[random_direction_sign]}`);
            testText.classList.add('text-7xl')
        }, 350);
        startTime = Date.now();  // Record the start time
        waitingForReaction = true;
    }, delay);
}

// Event listener for keypress
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' ) {
     if(!waitingForReaction) {
        startReactionTest();
     }
       
    } else if (event.code === 'ArrowLeft' || event.code === 'ArrowRight' || event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        if (waitingForReaction) {
            testText.classList.remove('text-7xl')
            const reaction = event.code.replace('Arrow', '').toLowerCase();
            reactions.push(arrows[reaction]);
            displayMessage(`Reaktion: ${arrows[reaction]}. Visade texten "${arrows[direction_text[counter]]}" och spelade ljudet "${arrows[direction_sound[counter]]}"`);
            counter++;
            waitingForReaction = false;
        }
    }
});         