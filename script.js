import { API_KEY } from "./key.js";
console.log(API_KEY);

const movieIds = [550, 680, 218, 629, 769, 424, 278, 155, 274, 272];

const movieSelect = document.getElementById("movie-select");
const getMovieBtn = document.getElementById("get-movie-btn");
const movieInfo = document.getElementById("movie-info");

getMovieBtn.addEventListener("click", () => {
  const selectedMovieId = movieSelect.value;
 // if (selectedMovieId) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${selectedMovieId}?api_key=${API_KEY}&append_to_response=videos`
         )
      .then((response) => {
        console.log(response.data);
        const movieData = response.data;
        const trailer = movieData.videos.results.find(
          (video) => video.type === "Trailer"
        );
        

        const posterPath = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;

        movieInfo.innerHTML = `
          <h2>${movieData.title}</h2>
          <p>${movieData.overview}</p>
          <p>Release date: ${movieData.release_date}</p>
          <p>Runtime: ${movieData.runtime} minutes</p>
          <p>Rating: ${movieData.vote_average} (${
          movieData.vote_count
        } votes)</p>
        <p>Original Language: ${movieData.original_language}</p>
        <p>Revenue: ${movieData.revenue} USD</p>
        <p>Budget: ${movieData.budget} USD</p>

          ${
            trailer
              ? `<p><a href="https://www.youtube.com/watch?v=${trailer.key}">Watch Trailer</a></p>`
              : ""
          }
          <img src="${posterPath}" alt="${movieData.title} poster">
        `;
      });
  }
);
