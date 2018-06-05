const tmbd = require('./tmdb');
const firebaseApi = require('./firebaseApi');
const dom = require('./dom');

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
      // call get movies event
      getAllMoviesEvent();
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
    if (e.key === 'Enter' && !$('#search').hasClass('hide')) {
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

const getAllMoviesEvent = () => {
  firebaseApi.getAllMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmbd.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get all movie', error);
    });
};

const getWishlistMoviesEvent = () => {
  firebaseApi.getWishlistMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmbd.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get all movie', error);
    });
};
const getWatchedMoviesEvent = () => {
  firebaseApi.getWatchedMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmbd.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get wathced movie', error);
    });
};

const deleteMovieFromFirebase = () => {
  $(document).on('click', '.deleteMovieFromCollection', (e) => {
    const movieToDeleteId = $(e.target).closest('.movie').data('firebaseId');
    firebaseApi.deleteMovieFromDatabase(movieToDeleteId)
      .then(() => {
        getAllMoviesEvent();
      })
      .catch((error) => {
        console.error('error', error);
      });
  });
};

const updateMovieEvent = () => {
  $(document).on('click', '.updateMovieToWatched', (e) => {
    const movieToUpdateId = $(e.target).closest('.movie').data('firebaseId');
    const movieToUpdateCard = $(e.target).closest('.movie');
    const updatedMovie = {
      title: movieToUpdateCard.find('.movie-title').text(),
      overview: movieToUpdateCard.find('.movie-overview').text(),
      'poster_path': movieToUpdateCard.find('img').data('poster'),
      rating: 0,
      isWatched: true,
    };
    firebaseApi.updateMovieToWatchedInDb(updatedMovie, movieToUpdateId)
      .then(() => {
        getAllMoviesEvent();
      })
      .catch((error) => {
        console.error('error in the update movie', error);
      });
  });
};

const filterEvents = () => {
  $('#filterButtons').on('click', (e) => {
    const classList = e.target.classList;
    if (classList.contains('wishlist')) {
      // show only isWatched falsw
      getWishlistMoviesEvent();
    } else if (classList.contains('watched')) {
      // show only true
      getWatchedMoviesEvent();
    } else {
      // show everthting
      getAllMoviesEvent();
    }
  });
};

const authEvents = () => {
  $('#signin-btn').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const pass = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then((user) => {

      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  });
  $('#register-btn').click((e) => {
    const email = $('#registerEmail').val();
    const pass = $('#registerPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  });
  $('#register-link').click((e) => {
    $('#login-form').addClass('hide');
    $('#registration-form').removeClass('hide');
  });

  $('#signin-link').click((e) => {
    $('#login-form').removeClass('hide');
    $('#registration-form').addClass('hide');
  });
  $('#logout').click((e) => {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.

    }).catch(function (error) {
      // An error happened.
    });
  });
};

const initializer = () => {
  mylinks();
  pressEnter();
  saveMovieToWishlistEvent();
  deleteMovieFromFirebase();
  updateMovieEvent();
  filterEvents();
  authEvents();
};

module.exports = {
  initializer,
  getAllMoviesEvent,
};
