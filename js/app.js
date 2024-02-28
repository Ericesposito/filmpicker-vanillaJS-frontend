let moviesData = []; // This will store the fetched movies data
let titles = []; // To store just the titles for the autocomplete

function fetchMoviesData() {
  fetch('../assets/movies.json')
    .then((response) => response.json())
    .then((data) => {
      moviesData = data; // Store the full movies data
      titles = moviesData.map((movie) => movie.title); // Extract titles for autocomplete
      console.log('Titles for autocomplete:', titles);
      console.log('MoviesData: ', moviesData);
    })
    .catch((error) => console.error('Failed to load movies data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  const inputBox = document.querySelector('#input-box');
  const resultsList = document.querySelector('#autocomplete-results');
  const submitBtn = document.querySelector('#generate-btn');
  const recommendationsContainer = document.querySelector('#movies-container');
  const recommendationsTitle = document.querySelector('#recommendations-title');
  const clearBtn = document.querySelector('#clear-btn');

  fetchMoviesData();

  function getMovieDetailsByTitle(title) {
    console.log('title before moviesData.find(): ', title);
    const movie = moviesData.find((movie) => movie.title === title);
    if (movie) {
      console.log('Movie details:', movie);
      // Here you can use the detailed movie information as needed
      const movieElement = document.createElement('div');
      movieElement.className = 'movie-card';
      const titleElement = document.createElement('h3');
      titleElement.textContent = `${movie.title}`;
      movieElement.appendChild(titleElement);
      // if (movie.poster === 'True') {
      //   const movieImg = document.createElement('img');
      //   movieImg.src = getImgUrl(movie.movieId);
      //   movieImg.alt = movie.title;
      //   movieElement.appendChild(movieImg);
      // }
      recommendationsContainer.appendChild(movieElement);
    } else {
      console.log('Movie not found');
    }
  }
  //  NEXT THING IS TO TAKE THIS DATA AND POPULATE THE FOREACH LOOP BELOW

  // Autocomplete functionality
  inputBox.addEventListener('input', () => {
    const inputValue = inputBox.value.trim().toLowerCase();
    resultsList.innerHTML = ''; // Clear previous suggestions
    if (inputValue) {
      const filteredTitles = titles.filter((title) =>
        title.toLowerCase().includes(inputValue)
      );
      filteredTitles.forEach((title) => {
        const li = document.createElement('li');
        li.textContent = title;
        li.addEventListener('click', () => {
          inputBox.value = title; // Fill input box with clicked title
          resultsList.innerHTML = ''; // Clear suggestions
        });
        resultsList.appendChild(li);
      });
    }
  });

  // Submit functionality
  submitBtn.addEventListener('click', () => {
    recommendationsContainer.innerHTML = ''; // Clear displayed recommendations
    recommendationsTitle.style.display = 'none';
    const movieTitle = inputBox.value.trim();
    if (movieTitle) {
      fetchRecommendations(movieTitle);
    } else {
      alert('Please enter a movie title.');
    }
  });

  function fetchRecommendations(movieTitle) {
    // Example POST request to fetch recommendations
    // Replace URL and adjust POST body and response handling as necessary
    console.log(`Fetching recommendations for: ${movieTitle}`);
    fetch('http://localhost:80/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favorite_movie: movieTitle,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.movie_recs.forEach((movie) => {
          getMovieDetailsByTitle(movie);
        });
      });
    // Display logic for recommendations goes here...
  }

  // Clear functionality
  clearBtn.addEventListener('click', () => {
    inputBox.value = ''; // Clear input box
    recommendationsContainer.innerHTML = ''; // Clear displayed recommendations
    recommendationsTitle.style.display = 'none';
  });
});
