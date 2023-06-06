









let inputs = document.querySelector('.inputs'),
    hint = document.querySelector('.hint span'),
    guess = document.querySelector('.guess span'),
    wrong = document.querySelector('.wrong span'),
    resetBtn = document.querySelector('.resetBtn'),
    typingInput = document.querySelector(".inp");
let remainingTime = 60;
let score = 0;     // Initial score value


// .......FOR THE MODAL
let showModal = (text, callback) => {
    let modal = document.getElementById("modal");
    let modalText = document.getElementById("modalText");
    let modalClose = document.querySelector(".close");

    modalText.textContent = text;
    modal.style.display = "block";

    modalClose.onclick = () => {
        modal.style.display = "none";
        callback();
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            callback();
        }
    };
};

    let word = [];
    let maximumGuesses =0; 
    let incorrectAlphabets = [];
    let correctAlphabets = [];

    randomWord = ()=> {
        let item = wordArray[Math.floor(Math.random()* wordArray.length)];
        word = item.word;
        maximumGuesses = word.length >= 5 ? 8 : 6;
        correctAlphabets =[]; incorrectAlphabets = [];
        hint.innerText = item.hint;
        guess.innerText = maximumGuesses;
        wrong.innerText = incorrectAlphabets;


        let html = "";
        for(let i =0; i < word.length; i++){
            html += `<input type="text" disabled>`;
            inputs.innerHTML = html;
        }

        remainingTime = 60; // Reset the remaining time for each new word
        clearInterval(timerInterval); // Clear the previous timer interval (if any)
        timerInterval = setInterval(updateRemainingTime, 1000); // Start the new timer interval
    }

    
    
    startGame = (param) => {
        let note = param.target.value.toLowerCase();
    if(note.match(/^[A-Za-z]+$/) && ! incorrectAlphabets.includes(`${note}`) && !correctAlphabets.includes(note))
    {
        if(word.includes(note))
        {
            for(let i = 0; i < word.length; i++)
            {
                if(word[i] == note)
                {
                    correctAlphabets.push(note);
                    inputs.querySelectorAll("input")[i].value = note;
                }
            }
        } else {
            maximumGuesses--;
            incorrectAlphabets.push(`${note}`);
        }
        guess.innerText =maximumGuesses;
        wrong.innerText = incorrectAlphabets.join('');
    }
    typingInput.value = "";


    setTimeout(() => {
        if(correctAlphabets.length === word.length){
            const modalText = `Congrats! You found the word ${word.toUpperCase()}`;
                showModal(modalText, () => {
                updateScore(); // Update the score
                randomWord();
            });
        } else if(maximumGuesses <1)
        {
            const modalText = "Game over! You do not have any remaining guesses";
                showModalTimeUp(modalText, () => {
                randomWord();
    });
        }else {
            // Game over due to time up
                
                    showModalTimeUp(modalText, () => {
                    randomWord();
            });
        }
        
    }, 100);
} 

let updateRemainingTime = () => {
    remainingTime--;
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        const modalText = "Time up! You did not guess the word in time";
        randomWord();
    }
};

let timerInterval = setInterval(updateRemainingTime, 1000); // Update remaining time every second


// to update the score............
let updateScore = () => {
    score++;
    document.getElementById("scoreValue").textContent = score;
};

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", startGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());

randomWord()