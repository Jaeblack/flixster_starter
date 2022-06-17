const apiKey = `0cd7dc719ed142aa7202969248bc6401`

const formMovie = document.getElementById("frm-movie");
const btnMore = document.getElementById('load-more-movies-btn');
const moviesGrid = document.getElementById('movies-grid');
const searchInput = document.getElementById('search-input');
const closeSearchBtn = document.getElementById('close-search-btn');


let searchParam;
let page = 0;
let limit;
let offset;

const apiURL = 'https://api.themoviedb.org/3/';
const apiImgURL = 'https://image.tmdb.org/t/p/w500';
const apiSearch = apiURL+`search/movie?`;
const apiTrending = apiURL+`movie/now_playing?`;


function addMovieElement( movie){
    let movieImg = apiImgURL+movie.poster_path;
    moviesGrid.innerHTML += `
    <div class="movie-card">
        <div class="movie-title">${movie.title}</div>
        <img src="${movieImg}" alt="${movie.title}" class="movie-poster">
        <div class="movie-votes">
            <p class="average">${movie.vote_average}</p>
            <p class="count">${movie.vote_count}</p>

        </div>
    </div>
    `;

}
function displayResults(data){
    data.data.forEach((oneGif, index) => {
        addGifElement( data.data[index].images.original.url);
    });
}
function displayResults(results){
    results.forEach((movie, index) => {
        addMovieElement(results[index]);
    });
}


function getOffset(){
    let newOff = page*limit;
    page += 1;
    return newOff;
}

async function searchMovie(){
    offset = getOffset();
    let apiParams = `api_key=${apiKey}&page=${page}&language=en-US&query=${searchParam}`;
    response = await fetch(`${apiSearch+apiParams}`);
    const resultMovie = await response.json();
    displayResults(resultMovie.results);
    searchInput.value = ``;
}

async function fetchMovies(){
    offset = getOffset();
    let apiParams = `api_key=${apiKey}&page=${page}&language=en-US`;
    response = await fetch(`${apiTrending+apiParams}`);
    const results  = await response.json();
    displayResults(results.results);
}

function addEventListeners(
    moviesElement,
    formElement,
    searchInputElement,
    closeElement,
    btnMoreElement
  ){
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        page = 0;
        searchParam = searchInputElement.value;
        if(moviesElement){
            moviesElement.innerHTML = ``;
        }
        searchMovie();
        if(btnMoreElement.classList.contains("hidden")){
            btnMoreElement.classList.remove("hidden")
        }
        if(closeElement.classList.contains("hidden")){
            closeElement.classList.remove("hidden")
        }
    });
    btnMoreElement.addEventListener('click', (event) => {
        event.preventDefault();
        fetchMovies();
        console.log('Yeaaah boiii');
    });
  }

window.onload = function(){
    addEventListeners(moviesGrid, formMovie, searchInput, closeSearchBtn, btnMore);
}
