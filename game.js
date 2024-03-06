document.addEventListener('DOMContentLoaded', () => {
  const letters = document.querySelectorAll('.letter');
  let nextSquare = 1; // Start with the first square

  letters.forEach(letter => {
    letter.addEventListener('click', function() {
      const row = Math.ceil(nextSquare / 5);
      const col = nextSquare % 5 === 0 ? 5 : nextSquare % 5;
      const targetSquare = document.querySelector(`.square-${row}-${col}`);
      
      if (targetSquare && !targetSquare.textContent.trim()) { // Check if square is empty
        targetSquare.textContent = this.textContent; // Set the letter in the square
        this.style.visibility = 'hidden'; // Hide the letter from the alphabet container
        nextSquare++; // Move to the next square
      }
    });
  });
});
