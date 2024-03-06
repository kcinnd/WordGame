document.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.letter');
    let nextSquare = 1;
    let history = []; // Track placed letters and their squares
    let currentGuess = []; // Reset currentGuess for each row
    let round = 1; // Track the current round
    const squaresPerRow = 5; // Squares per row

    const resetLetters = () => {
        letters.forEach(letter => letter.style.visibility = 'visible');
    };

    const checkGuess = () => {
        const guessWord = currentGuess.join('');
        if (guessWord === chosenWord) {
            celebrateWin();
            return;
        } else if (round < 7) {
            alert('Try again! Round: ' + round);
        } else {
            alert('Game over! The word was: ' + chosenWord);
            resetGame();
        }
    };

    const celebrateWin = () => {
        // Celebration animations and effects
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

    // Letter click event to accumulate guesses and check after each row
    letters.forEach(letter => {
        letter.addEventListener('click', function() {
            if (nextSquare <= squaresPerRow * round) {
                const targetSquare = document.querySelector(`.square-${round}-${nextSquare - squaresPerRow * (round - 1)}`);
                if (targetSquare && !targetSquare.textContent.trim()) {
                    targetSquare.textContent = this.textContent;
                    targetSquare.classList.add('filled', 'glow-intense');
                    history.push({ square: targetSquare, letter: this });
                    this.style.visibility = 'hidden';
                    currentGuess.push(this.textContent.toLowerCase());
                    nextSquare++;

                    if (currentGuess.length === squaresPerRow) {
                        checkGuess();
                        round++;
                        currentGuess = []; // Reset guess for the next row
                    }
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
            currentGuess.pop(); // Remove the last letter from the current guess
            nextSquare--;
        }
    });

    // Clear functionality
    document.getElementById('clearButton').addEventListener('click', resetGame);
});
