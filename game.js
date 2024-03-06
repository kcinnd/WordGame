const words = ['globe', 'human', 'earth', 'world', 'urban', 'plant', 'flora', 'fauna', 'ocean'];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let currentGuess = [];
let round = 1;

document.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.letter');
    let nextSquare = 1;
    let history = [];
    const instructionsBtn = document.getElementById('readInstructionsBtn');
    const instructionsModal = document.getElementById('instructionsModal');
    const closeBtn = document.querySelector('.close-btn');
    let usedLettersInRound = new Set();

    instructionsBtn.onclick = function() {
        instructionsModal.style.display = 'block'; // Show the modal
    }

    closeBtn.onclick = function() {
        instructionsModal.style.display = 'none'; // Hide the modal
    }

    window.onclick = function(event) {
        if (event.target == instructionsModal) {
            instructionsModal.style.display = 'none'; // Hide the modal when clicking outside of it
        }
    }

    const resetLetters = () => {
        letters.forEach(letter => {
            letter.style.visibility = 'visible'; // Make all letters visible again
            usedLettersInRound.clear(); // Reset used letters for the new round
        });
    };

    const checkGuess = () => {
        const guessWord = currentGuess.join('');
        if (guessWord === chosenWord) {
            celebrateWin();
            return;
        }

        // Move to the next round or end the game
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
        alert('Congratulations! You guessed the word!');
        resetGame();
    };

    const resetGame = () => {
        document.querySelectorAll('.square').forEach(square => {
            square.textContent = '';
            square.classList.remove('filled', 'glow-intense');
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
            if (!usedLettersInRound.has(this.textContent.toLowerCase())) { // Check if the letter hasn't been used in this round
                const targetRow = Math.ceil(nextSquare / 5);
                const targetCol = nextSquare % 5 === 0 ? 5 : nextSquare % 5;
                const targetSquare = document.querySelector(`.square-${targetRow}-${targetCol}`);

                if (!targetSquare.classList.contains('filled')) {
                    targetSquare.textContent = this.textContent;
                    targetSquare.classList.add('filled', 'glow-intense');
                    history.push({ square: targetSquare, letter: this });
                    this.style.visibility = 'hidden'; // Hide the letter for the current round
                    usedLettersInRound.add(this.textContent.toLowerCase()); // Mark the letter as used in this round
                    currentGuess.push(this.textContent.toLowerCase());

                    // Check the guess after filling the last square of the row
                    if (targetCol === 5) {
                        checkGuess();
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
            lastMove.square.classList.remove('filled', 'glow-intense');
            lastMove.letter.style.visibility = 'visible';
            currentGuess.pop();
            nextSquare--;
        }
    });

    document.getElementById('clearButton').addEventListener('click', resetGame);
});
