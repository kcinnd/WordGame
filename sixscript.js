document.addEventListener('DOMContentLoaded', () => {
    const words = ['global', 'domain', 'county', 'legend', 'leader', 'oceans', 'plants', 'animal', 'flower', 'forest', 'castle', 'planet', 'island', 'travel', 'nature', 'market', 'jungle', 'canyon', 'glacier', 'region'];
    let chosenWord = words[Math.floor(Math.random() * words.length)];
    let currentGuess = [];
    let round = 1;
    const letters = document.querySelectorAll('.letter');
    let nextSquare = 1;
    let history = [];
    const instructionsBtn = document.getElementById('readInstructionsBtn');
    const instructionsModal = document.getElementById('instructionsModal');
    const closeBtn = document.querySelector('.close-btn');
    let usedLettersInRound = new Set();

    instructionsBtn.onclick = function() {
        instructionsModal.style.display = 'block'; 
    };

    closeBtn.onclick = function() {
        instructionsModal.style.display = 'none'; 
    };

    window.onclick = function(event) {
        if (event.target == instructionsModal) {
            instructionsModal.style.display = 'none'; 
        }
    };

    const resetLetters = () => {
        letters.forEach(letter => {
            letter.style.visibility = 'visible'; // Make all letters visible again for the new round
            usedLettersInRound.clear(); // Reset used letters for the new round
        });
    };

    const checkGuess = () => {
        const guessWord = currentGuess.join('');
        const chosenWordArray = chosenWord.split('');
    
        // Feedback for each letter in the guess
        currentGuess.forEach((letter, index) => {
            const targetSquare = document.querySelector(`.square-${round}-${index + 1}`);
            
            if (chosenWord[index] === letter) {
                // Correct letter in the correct position
                targetSquare.classList.add('correct-position');
                targetSquare.classList.remove('incorrect-letter'); // Ensure the incorrect class is removed
            } else if (chosenWord.includes(letter)) {
                // Correct letter but in the wrong position
                targetSquare.classList.add('correct-letter');
                targetSquare.classList.remove('incorrect-letter'); // Ensure the incorrect class is removed
            } else {
                // Incorrect letter
                targetSquare.classList.add('incorrect-letter');
            }
        });
    
        if (guessWord === chosenWord) {
            celebrateWin();
            return;
        }
    
        if (round === 7) {
            alert('Game over! The word was: ' + chosenWord);
            resetGame();
        } else {
            round++;
            alert('Try again! Round: ' + round);
        }
    
        currentGuess = []; // Prepare for the next guess
        resetLetters(); // Make all letters available again for the new round
    };
    
    const celebrateWin = () => {
        const congratsModal = document.getElementById('congrats-modal');
        const closeBtn = document.querySelector('.congrats-close-btn');
    
        congratsModal.style.display = 'block';
    
        closeBtn.onclick = function() {
            congratsModal.style.display = 'none';
        }
    
        window.onclick = function(event) {
            if (event.target == congratsModal) {
                congratsModal.style.display = 'none';
            }
        }
    };

    document.getElementById('continueBtn').addEventListener('click', function() {
        window.location.href = 'sixgame.html'; // Relative path, assuming it's in the same directory
    });

    const resetGame = () => {
        document.querySelectorAll('.square').forEach(square => {
            square.textContent = '';
            square.classList.remove('filled', 'glow-intense', 'correct-position', 'correct-letter');
        });
        resetLetters();
        history = [];
        nextSquare = 1;
        round = 1;
        currentGuess = [];
        chosenWord = words[Math.floor(Math.random() * words.length)];
    };

    letters.forEach(letter => {
        letter.addEventListener('click', function() {
            if (!usedLettersInRound.has(this.textContent.toLowerCase()) && currentGuess.length < 6) { // Check if the letter hasn't been used in this round
                const targetRow = Math.ceil(nextSquare / 6);
                const targetCol = nextSquare % 6 === 0 ? 6 : nextSquare % 6;
                const targetSquare = document.querySelector(`.square-${targetRow}-${targetCol}`);

                if (!targetSquare.classList.contains('filled')) {
                    targetSquare.textContent = this.textContent;
                    targetSquare.classList.add('filled', 'glow-intense');
                    history.push({ square: targetSquare, letter: this });
                    this.style.visibility = 'hidden'; // Hide the letter for the current round
                    usedLettersInRound.add(this.textContent.toLowerCase()); // Mark the letter as used in this round
                    currentGuess.push(this.textContent.toLowerCase());

                    if (currentGuess.length === 6) {
                        checkGuess(); // Only check the guess when the row is complete
                    }

                    nextSquare++;
                }
            }
        });
    });

    document.getElementById('undoButton').addEventListener('click', () => {
        const lastMove = history.pop();
        if (lastMove) {
            lastMove.square.textContent = '';
            lastMove.square.classList.remove('filled', 'glow-intense', 'correct-position', 'correct-letter');
            lastMove.letter.style.visibility = 'visible'; // Make the letter visible again for the current round
            usedLettersInRound.delete(lastMove.letter.textContent.toLowerCase()); // Remove the letter from the used set
            currentGuess.pop(); // Remove the last letter from the current guess
            nextSquare--;
        }
    });

    document.getElementById('clearButton').addEventListener('click', resetGame);
});
