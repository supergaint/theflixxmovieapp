const global = {
    currentPage: window.location.pathname,
    search: {
      term: '',
      type: '',
      page: 1,
      totalPages: 1,
      totalResults: 0,
    },
    api: {
      
      apiKey: '07b3072870baf9f4743c2db929679585',
      apiUrl: 'https://api.themoviedb.org/3/',
    },
    
  };
  async function displayPopularMovies() {
    const { results } = await fetchAPIData('movie/popular');
  
    results.forEach((movie) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              ${
                movie.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              />`
                  : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
              </p>
            </div>
          `;
  
      document.querySelector('#popular-movies').appendChild(div);
    });
  }
  async function displayPopularShows() {
    const { results } = await fetchAPIData('tv/popular');
  
    results.forEach((show) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
            <a href="movie-details.html?id=${show.id}">
              ${
                show.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
              />`
                  : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${show.name}</h5>
              <p class="card-text">
                <small class="text-muted">Air date: ${show.first_air_date}</small>
              </p>
            </div>
          `;
  
      document.querySelector('#popular-shows').appendChild(div);
    });
  }
async function displayMovieDetails(){
 const movieID =window.location.search.split('=')[1];
 
 const movie = await fetchAPIData(`movie/${movieID}`);

 const div = document.createElement('div');

 div.innerHTML= `
 <div class="details-top">
          <div>
          ${
            movie.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
              : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
          }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average} / 10
            </p>
            <p class="text-muted">Release Date: XX/XX/XXXX</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              atque molestiae error debitis provident dolore hic odit, impedit
              sint, voluptatum consectetur assumenda expedita perferendis
              obcaecati veritatis voluptatibus. Voluptatum repellat suscipit,
              quae molestiae cupiditate modi libero dolorem commodi obcaecati!
              Ratione quia corporis recusandae delectus perspiciatis consequatur
              ipsam. Cumque omnis ad recusandae.
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              <li>Genre 1</li>
              <li>Genre 2</li>
              <li>Genre 3</li>
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $1,000,000</li>
            <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
            <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">Company 1, Company 2, Company 3</div>
        </div> 
 `;

 document.querySelector('#movie-details').appendChild(div);
}


// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
  
    showSpinner();
  
    const response = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );
  
    const data = await response.json();
  
    hideSpinner();
  
    return data;
  }





// show spinner
function showSpinner() {
    document.querySelector(".spinner").classList.add("show");
  }
  //hide spinner
  function hideSpinner() {
    document.querySelector(".spinner").classList.remove("show");
  }
  
  // highlight active link
  function highLightActiveLink() {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      if (link.getAttribute("href") === global.currentPage) {
        link.classList.add("active");
      }
    });
  }
  
  
function init() {
    switch (global.currentPage) {
      case "/":
      case "/index.html":
        displayPopularMovies();
        console.log('ok');
        break;
      case "/shows.html":
        displayPopularShows();
        break;
      case "/movie-details.html":
        displayMovieDetails();
        break;
      case "/tv-details.html":
        console.log("tv details");
        break;
      case "/search.html":
        console.log("search");
        break;
    }
    highLightActiveLink();
  }
  
  document.addEventListener("DOMContentLoaded", init);

