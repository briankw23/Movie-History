const tmbd = require('./tmdb');

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
  tmbd.showResults();
};

const initializer = () => {
  mylinks();
  pressEnter();
};

module.exports = {
  initializer,
};
