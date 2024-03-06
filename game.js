document.addEventListener('DOMContentLoaded', () => {
  const letters = document.querySelectorAll('.letter');
  let nextSquare = 1; // Start with the first square

  letters.forEach(letter => {
    letter.addEventListener('click', function() {
      const row = Math.ceil(nextSquare / 5);
      const col = nextSquare % 5 === 0 ? 5 : nextSquare % 5;
      const targetSquare = document.querySelector(`.square-${row}-${col}`);
      
      if (targetSquare && !targetSquare.textContent.trim()) {
        targetSquare.textContent = this.textContent;
        targetSquare.style.color = '#0ff'; // Set the letter color
        targetSquare.style.textShadow = '0 0 5px #0ff, 0 0 10px #0ff, 0 0 15px #0ff, 0 0 20px #0ff'; // Inner and outer glow for the letter
        targetSquare.style.boxShadow = 'inset 0 0 10px #0ff, 0 0 20px #0ff'; // Make the square glow more
        this.style.visibility = 'hidden'; // Hide the letter from the alphabet container
        nextSquare++; // Move to the next square
      }
    });
  });
});
