document.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.letter');
    let nextSquare = 1;
    let history = []; // Track placed letters and their squares
    let lockedRows = new Set(); // Track locked rows
    const totalSquares = 35; // 7 rows * 5 columns
    const squaresPerRow = 5;

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
