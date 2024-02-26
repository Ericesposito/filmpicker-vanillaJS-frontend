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

    // Ensure user has entered valid data
    if (userInput.trim() !== '') {
      fetch('http://localhost:80/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favorite_movie: userInput,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          populateMovies(data['movie_recs']);
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    } else {
      alert('Please enter a movie name!');
    }
  });

  function populateMovies(movies) {
    // Clear current container of movies
    moviesContainer.innerHTML = '';

    console.log(movies);

    // Loop through obtained list of movies and populate an element for each
    movies.forEach((movie) => {
      // Creating an HTML element for each movie
      const movieElement = document.createElement('div');

      // Populating element HTML with dynamic data obtained
      movieElement.innerHTML = `
      <h3>${movie.title}</h3>
      <img src="${movie.poster}" alt="${movie.title}">
      <p>${movie.description}</p>
      `;

      moviesContainer.appendChild(movieElement);
    });
  }
});
