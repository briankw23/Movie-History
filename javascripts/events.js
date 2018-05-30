const tmbd = require('./tmdb');
const firebaseApi = require('./firebaseApi');

const mylinks = () => {
  $(document).click((e) => {
    if (e.target.id === 'authlink') {
      $('#myMovies').addClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').removeClass('hide');
    } else if (e.target.id === 'movielink') {
      $('#authScreen').addClass('hide');
      $('#search').addClass('hide');
      $('#myMovies').removeClass('hide');
    } else if (e.target.id === 'searchlink') {
      $('#authScreen').addClass('hide');
      $('#myMovies').addClass('hide');
      $('#search').removeClass('hide');
    }
  });
};

const pressEnter = () => {
  // keyPress Event
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      const searchWords = $('#searchBar').val().replace(' ', '%20');
      tmbd.showResults(searchWords);
    };
  });
};
const saveMovieToWishlistEvent = () => {
  $(document).on('click','.addMovietoWishlist', (e) => {
    const movieToAddCard = $(e.target).closest('.movie');
    const movieToAdd = {
      title: movieToAddCard.find('.movie-title').text(),
      overview: movieToAddCard.find('.movie-overview').text(),
      'poster_path': movieToAddCard.find('img').data('poster'),
      rating: 0,
      isWatched: false,
    };
    firebaseApi.saveMovieToWishList(movieToAdd)
      .then(() => {
        movieToAddCard.remove();
      })
      .catch((error) => {
        console.error('error in saving movie', error);
      });
  });
};

const initializer = () => {
  mylinks();
  pressEnter();
  saveMovieToWishlistEvent();
};

module.exports = {
  initializer,
};
