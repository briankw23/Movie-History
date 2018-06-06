let firebaseConfig = {};

let uid = '';

const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
};

const setUID = (newUID) => {
  uid = newUID;
  console.log(uid);
};

const saveMovieToWishList = (newMovie) => {
  newMovie.uid = uid;
  console.log(uid);
  return new Promise((resolve,reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/movies.json`,
      data: JSON.stringify(newMovie),
    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getAllMovies = () => {
  const allMoviesArray = [];
  return new Promise((resolve,reject) => {
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allMoviesObject) => {
        if (allMoviesObject !== null) {
          Object.keys(allMoviesObject).forEach((fbkey) => {
            allMoviesObject[fbkey].id = fbkey;
            allMoviesArray.push(allMoviesObject[fbkey]);
          });
        }
        resolve(allMoviesArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getWatchedMovies = () => {
  const allMoviesArray = [];
  return new Promise((resolve,reject) => {
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allMoviesObject) => {
        if (allMoviesObject !== null) {
          Object.keys(allMoviesObject).forEach((fbkey) => {
            if (allMoviesObject[fbkey].isWatched) {
              allMoviesObject[fbkey].id = fbkey;
              allMoviesArray.push(allMoviesObject[fbkey]);
            }
          });
        }
        resolve(allMoviesArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getWishlistMovies = () => {
  const allMoviesArray = [];
  return new Promise((resolve,reject) => {
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allMoviesObject) => {
        if (allMoviesObject !== null) {
          Object.keys(allMoviesObject).forEach((fbkey) => {
            if (!allMoviesObject[fbkey].isWatched) {
              allMoviesObject[fbkey].id = fbkey;
              allMoviesArray.push(allMoviesObject[fbkey]);
            }
          });
        }
        resolve(allMoviesArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const deleteMovieFromDatabase = (movieId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/movies/${movieId}.json`,
    })
      .done(() => {
        resolve();
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const updateMovieToWatchedInDb = (updatedMovie, movieId) => {
  updatedMovie.uid = uid;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/movies/${movieId}.json`,
      data: JSON.stringify(updatedMovie),
    })
      .done((modMovie) => {
        resolve(modMovie);
      })
      .fail((error) => {
        console.error(error);
      });
  });
};

module.exports = {
  saveMovieToWishList,
  setUID,
  setConfig,
  getAllMovies,
  deleteMovieFromDatabase,
  updateMovieToWatchedInDb,
  getWatchedMovies,
  getWishlistMovies,
};
