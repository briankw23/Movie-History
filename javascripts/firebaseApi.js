let firebaseConfig = {};

const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
};

const saveMovieToWishList = (newMovie) => {
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
      url: `${firebaseConfig.databaseURL}/movies.json`,
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

module.exports = {
  saveMovieToWishList,
  setConfig,
  getAllMovies,
};
