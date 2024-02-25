document.addEventListener('DOMContentLoaded', (e) => {
  console.log('Document is fully loaded and parsed');

  // grabbing a few HTML elements by their designated id to store in JS variables
  const submitBtn = document.getElementById('submit-btn');
  const movieInput = document.getElementById('movie-input');
  const moviesContainer = document.getElementById('movies-container');

  submitBtn.addEventListener('click', (e) => {
    // Prevent default functionality for screen refresh upon click
    e.preventDefault();

    // Grab the user-entered value in the movie-input element
    const userInput = movieInput.value;

    if (userInput.trim() !== '') {
      fetch('http://localhost:80/recommendations');
    }
  });
});
