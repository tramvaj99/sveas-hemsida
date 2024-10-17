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
function populateTable(data) {
    const tableBody = document.querySelector("#result-table tbody");

    // Loop through each data item
    data.forEach(item => {
        // Create a new row
        const row = document.createElement("tr");

        // Create cells and append to the row
        Object.values(item).forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}


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
        audio.play()
        displayMessage(`${arrows[random_direction_sign]}`);
        testText.classList.add('text-7xl')
        startTime = Date.now();  // Record the start time
        waitingForReaction = true;
    }, delay);
}

// Event listener for keypress
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' ) {
        if(counter >= 1){
            displayMessage(`Testet är avklarat. Ditt resultat är:
            Ljudet: ${arrows[direction_sound[0]]}/Text:${arrows[direction_text[0]]} - ${reactions[0]} ,
            Ljudet: ${arrows[direction_sound[1]]}/Text:${arrows[direction_text[1]]} - ${reactions[0]} ,
            Ljudet: ${arrows[direction_sound[2]]}/Text:${arrows[direction_text[2]]} - ${reactions[0]} ,
            Ljudet: ${arrows[direction_sound[3]]}/Text:${arrows[direction_text[3]]} - ${reactions[0]} ,
            Ljudet: ${arrows[direction_sound[4]]}/Text:${arrows[direction_text[4]]} - ${reactions[0]} ,

                ` );
            
                data = [
                    { 'Ljud': arrows[direction_sound[0]], 'Text': arrows[direction_text[0]], 'Reaktion': reactions[0] },
                    { 'Ljud': arrows[direction_sound[1]], 'Text': arrows[direction_text[1]], 'Reaktion': reactions[1] },
                    { 'Ljud': arrows[direction_sound[2]], 'Text': arrows[direction_text[2]], 'Reaktion': reactions[2] },
                    { 'Ljud': arrows[direction_sound[3]], 'Text': arrows[direction_text[3]], 'Reaktion': reactions[3] },
                    { 'Ljud': arrows[direction_sound[4]], 'Text': arrows[direction_text[4]], 'Reaktion': reactions[4] }
                ];
                populateTable(data);
            currentlyTesting = false;
        }else {
            if (!waitingForReaction) {
                startReactionTest();  // Stasrt the test if not waiting
            } 
            }
       
    } else if (event.code === 'ArrowLeft' || event.code === 'ArrowRight' || event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        if (waitingForReaction) {
            testText.classList.remove('text-7xl')
            const reaction = event.code.replace('Arrow', '').toLowerCase();
            reactions.push(arrows[reaction]);
            displayMessage(`Reaktion: ${arrows[reaction]}`);
            counter++;
            setTimeout(() => 
                {
                    if(counter === 1){
                        displayMessage(`Test ${counter}/5 avklart. Klicka på Space för att se resultat.`);
                    }else {
                        displayMessage(`Test ${counter}/5 avklart. Klicka på Space för att börja nästa test.`);
                        waitingForReaction = false;  // Reset the test state
                    } 
                }, 
            2000);
        }
    }
});         