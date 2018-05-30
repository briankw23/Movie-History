const domString = (movieArray, config, whereToPrint) => {
  let string = '';
  movieArray.forEach((movie, index) => {
    if (index % 3 === 0) {
      string += `<div class="row">`;
    }
    string += `<div class="col-sm-6 col-md-4">`;
    string +=   `<div class="thumbnail movie">`;
    string +=      `<img data-poster="${movie.poster_path}" src="${config.base_url}/w342/${movie.poster_path}" alt="Movie Poster">`;
    string +=       `<div class="caption">`;
    string +=         `<h3 class="movie-title"">${movie.original_title ? movie.original_title : movie.title}</h3>`;
    string +=         `<p class="movie-overview">${movie.overview}</p>`;
    string +=         `<p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default addMovietoWishlist" role="button">Wishlist</a></p>`;
    string +=       `</div>`;
    string +=     `</div>`;
    string += `</div>`;
    if (index % 3 === 2) {
      string += `</div>`;
    }
  });
  printToDom(whereToPrint, string);
};

const printToDom = (whereToPrint, strang) => {
  $(`#${whereToPrint}`).html(strang);
};

module.exports = {
  domString,
};
