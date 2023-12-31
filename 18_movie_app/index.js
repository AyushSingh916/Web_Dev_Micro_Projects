const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popular.desc&api_key=1f7b599c551bdd695a5756f903b28a29&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=1f7b599c551bdd695a5756f903b28a29&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById('main');

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data.results);
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        // Check if poster_path is available
        const posterUrl = poster_path ? IMG_PATH + poster_path : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW92aWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60';

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
          <img src="${posterUrl}"
            alt="${title}"
            srcset=""
          />
          <div class="movie-info">
            <h3>${title}</h3> 
            <span class="${getClassByRate(vote_average)}">${vote_average}</span> 
          </div>
          <div class="overview">
            <h3>Overview</h3>
            ${overview}
          </div>`;

        main.appendChild(movieEl);
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== "") {
        getMovies(SEARCH_API + searchTerm);

        search.value = "";
    } else {
        window.location.reload();
    }
});
