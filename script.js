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

let lastData = ``;


function addMovieElement( movie){
    let movieImg = apiImgURL+movie.poster_path;
    moviesGrid.innerHTML += `
    <div class="movie-card">

        <img src="${movieImg}" alt="${movie.title}" class="movie-poster">
        <div class="movie-title">
            <h2> ${movie.title} </h2>
        </div>
        <div class="movie-votes">
            <p class="average">${movie.vote_average}</p>
            <p class="count">${movie.vote_count}</p>

        </div>
    </div>
    `;

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

}

async function fetchMovies(){
    offset = getOffset();
    let apiParams = `api_key=${apiKey}&page=${page}&language=en-US`;
    response = await fetch(`${apiTrending+apiParams}`);
    const results  = await response.json();
    displayResults(results.results);
}

function enableLoadMore(){

}

function btnsAfterSearch(){
    if(!btnMore.classList.contains("hidden")){
        btnMore.classList.add("hidden")
    }
    if(closeSearchBtn.classList.contains("hidden")){
        closeSearchBtn.classList.remove("hidden")
    }
}

function btnsAfterCloseSearch(){
    if(btnMore.classList.contains("hidden")){
        btnMore.classList.remove("hidden")
    }
    if(!closeSearchBtn.classList.contains("hidden")){
        closeSearchBtn.classList.add("hidden")
    }
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
        btnsAfterSearch();
    });
    formElement.addEventListener('reset', (event) => {
        event.preventDefault();
        searchInput.value = ``;
        btnsAfterCloseSearch();
        page = 0;

        moviesElement.innerHTML = ``;

        fetchMovies();
    });
    btnMoreElement.addEventListener('click', (event) => {
        event.preventDefault();
        fetchMovies();
    });
  }

window.onload = function(){
    addEventListeners(moviesGrid, formMovie, searchInput, closeSearchBtn, btnMore);
    btnsAfterCloseSearch();
    page = 0;
    fetchMovies();
}
