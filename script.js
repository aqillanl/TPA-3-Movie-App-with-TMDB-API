const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3d0eb4cbd1e26b19f25f5226a56f287a&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3d0eb4cbd1e26b19f25f5226a56f287a&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// mengambil initial movies
getMovies(API_URL);

async function getMovies(API_URL) {
  const res = await fetch(API_URL);
  const movies = await res.json();
  console.log(movies.results); // menampilkan ke console 
  showMovies(movies.results);
}

// membuat fungsi menampilkan movies
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, release_date } = movie; 

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
            <span>${vote_average}</span>
            </div>
            <h5>${release_date}</h5>
            `;
    main.appendChild(movieEl);
  });
}

form.addEventListener('submit', (e) => { // membuat fungsi search
  e.preventDefault()

  const searchTerm = search.value

  if(searchTerm){
    getMovies(SEARCH_API+searchTerm)
  } else { //jika dihapus maka akan kembali ke halaman awal
    window.location.reload()
  }
})


