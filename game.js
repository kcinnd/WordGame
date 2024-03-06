const words = ['globe', 'human', 'earth', 'world', 'urban', 'plant', 'flora', 'fauna', 'ocean']; // List of words
let chosenWord = words[Math.floor(Math.random() * words.length)]; // Randomly chosen word
let currentGuess = []; // Stores the current guess
let round = 1; // Current round

document.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.letter');
    let nextSquare = 1;
    let history = []; // Track placed letters and their squares

    const resetLetters = () => {
        letters.forEach(letter => letter.style.visibility = 'visible');
    };

    const checkGuess = () => {
        const guessWord = currentGuess.join('');
        if (guessWord === chosenWord) {
            celebrateWin();
            return;
        }

        if (currentGuess.length === 5) { // Guess is complete
            if (round === 7) {
                alert('Game over! The word was: ' + chosenWord);
                resetGame();
            } else {
                round++;
                currentGuess = []; // Reset current guess for the next round
                alert('Try again! Round: ' + round);
            }
        }
    };

    const celebrateWin = () => {
        // Implement celebration animations and effects here
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
        chosenWord = words[Math.floor(Math.random() * words.length)]; // Choose a new word
    };

    // Letter click event
    letters.forEach(letter => {
        letter.addEventListener('click', function() {
            const row = Math.ceil(nextSquare / 5);
            const col = nextSquare % 5 === 0 ? 5 : nextSquare % 5;
            const targetSquare = document.querySelector(`.square-${row}-${col}`);

            if (!targetSquare.classList.contains('filled') && currentGuess.length < 5) {
                targetSquare.textContent = this.textContent;
                targetSquare.classList.add('filled', 'glow-intense');
                history.push({ square: targetSquare, letter: this });
                this.style.visibility = 'hidden';
                currentGuess.push(this.textContent.toLowerCase());

                nextSquare++;
                if (nextSquare % 5 === 1 || nextSquare > 35) {
                    checkGuess();
                }
            }
        });
    });

    // Undo functionality
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

    // Clear functionality
    document.getElementById('clearButton').addEventListener('click', resetGame);
});
