const words = ['globe', 'human', 'earth', 'world', 'urban', 'plant', 'flora', 'fauna', 'ocean']; // Example list of words
let chosenWord = words[Math.floor(Math.random() * words.length)]; // Randomly chosen word
let currentGuess = []; // Stores the current guess
let round = 1; // Current round

document.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.letter');
    let nextSquare = 1;
    let history = []; // Track placed letters and their squares
    let lockedRows = new Set(); // Track locked rows
    const totalSquares = 35; // 7 rows * 5 columns
    const squaresPerRow = 5;

    // Modal functionality
    const modal = document.getElementById('instructionsModal');
    const closeButton = document.querySelector('.close');
    
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
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
        currentGuess = [];
        nextSquare = 1;
        round = 1;
        chosenWord = words[Math.floor(Math.random() * words.length)]; // Choose a new word
        resetLetters();
    };

    // Update letter click event to push letters to currentGuess and call checkGuess()
    letters.forEach(letter => {
        letter.addEventListener('click', function() {
            if (currentGuess.length < 5) {
                currentGuess.push(this.textContent.toLowerCase());
                checkGuess();
            }
        });
    });

    const resetLetters = () => {
        letters.forEach(letter => letter.style.visibility = 'visible');
    };

    letters.forEach(letter => {
        letter.addEventListener('click', function() {
            const row = Math.ceil(nextSquare / 5);
            const col = nextSquare % 5 === 0 ? 5 : nextSquare % 5;
            const targetSquare = document.querySelector(`.square-${row}-${col}`);

            if (targetSquare && !targetSquare.textContent.trim()) {
                targetSquare.textContent = this.textContent;
                targetSquare.classList.add('filled', 'glow-intense'); // Add intense glow
                history.push({ square: targetSquare, letter: this });
                this.style.visibility = 'hidden';
                nextSquare++;
            }
        });
    });

    // Undo functionality
    document.getElementById('undoButton').addEventListener('click', () => {
        const lastMove = history.pop();
        if (lastMove) {
            lastMove.square.textContent = '';
            lastMove.square.classList.remove('filled', 'glow-intense'); // Remove intense glow
            lastMove.letter.style.visibility = 'visible';
            nextSquare--;
        }
    });

    // Clear functionality
    document.getElementById('clearButton').addEventListener('click', () => {
        document.querySelectorAll('.square').forEach(square => {
            square.textContent = '';
            square.classList.remove('filled', 'glow-intense'); // Remove intense glow
        });
        resetLetters();
        history = [];
        nextSquare = 1;
    });
});
