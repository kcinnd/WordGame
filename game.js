document.addEventListener('DOMContentLoaded', () => {
  const letters = document.querySelectorAll('.letter');
  let nextSquare = 1;
  const totalSquares = 35; // 7 rows * 5 columns
  const squaresPerRow = 5;

  const resetLetters = () => {
    letters.forEach(letter => {
      letter.style.visibility = 'visible'; // Make all letters visible again
    });
  };

  letters.forEach(letter => {
    letter.addEventListener('click', function() {
      const row = Math.ceil(nextSquare / squaresPerRow);
      const col = nextSquare % squaresPerRow === 0 ? squaresPerRow : nextSquare % squaresPerRow;
      const targetSquare = document.querySelector(`.square-${row}-${col}`);
      
      if (targetSquare && !targetSquare.textContent.trim()) {
        targetSquare.textContent = this.textContent;
        targetSquare.classList.add('filled'); // Add the 'filled' class to intensify the glow
        this.style.visibility = 'hidden'; // Hide the letter from the alphabet container
        nextSquare++; // Move to the next square

        if (nextSquare > totalSquares) { // All squares are filled, indicating the end of the game
          nextSquare = 1; // Reset to the first square for a new game
          resetLetters(); // Make all letters visible again
        } else if (nextSquare % squaresPerRow === 1) { // A new row (round) is starting
          resetLetters(); // Make all letters visible again for the new round
        }
      }
    });
  });
});
