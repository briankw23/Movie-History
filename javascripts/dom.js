const domString = (movieArray, config) => {
  let string = '';
  movieArray.forEach((movie) => {
    string += `<div class="col-sm-6 col-md-4">`;
    string +=   `<div class="thumbnail">`;
    string +=      `<img src="${config.base_url}/w342/${movie.poster_path}" alt="Movie Poster">`;
    string +=       `<div class="caption">`;
    string +=         `<h3>${movie.original_title}</h3>`;
    string +=         `<p>${movie.overview}</p>`;
    string +=         `<p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default" role="button">Wishlist</a></p>`;
    string +=       `</div>`;
    string +=     `</div>`;
    string += `</div>`;
  });
  printToDom(string);
};

const printToDom = (strang) => {
  $('#movies').html(strang);
};

module.exports = {
  domString,
};
