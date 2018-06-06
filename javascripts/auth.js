const {getAllMoviesEvent,} = require('./events');

const {setUID,} = require('./firebaseApi');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUID(user.uid);
      // User is signed in.
      $('#authScreen').addClass('hide');
      $('#myMovies').removeClass('hide');
      $('#savedMovies').removeClass('hide');
      $('#search').addClass('hide');
      $('#movielink, #searchlink, #logout').removeClass('hide');
      $('#authlink').addClass('hide');
      // call get movies event
      getAllMoviesEvent();
    } else {
      // No user is signed in.
      $('#myMovies').addClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').removeClass('hide');
      $('#savedMovies, #searchlink, #logout').addClass('hide');
      $('#authlink').removeClass('hide');
      $('#movielink').addClass('hide');
    };
  });
};

module.exports = {
  checkLoginStatus,
};
