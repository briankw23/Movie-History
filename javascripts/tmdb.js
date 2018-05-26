/* eslint camelcase: 0 */
const dom = require('./dom');

let tmdbKey = '';

let imageConfig = {};

const setKey = (key) => {
  tmdbKey = key;
  getConfig();
};

const getConfig = () => {
  tmdbConfiguration()
    .then((result) => {
      imageConfig = result.images;
    })
    .catch((err) => {
      console.error('error with tmdb config:', err);
    });
};

const tmdbConfiguration = () => {
  return new Promise((resolve, reject) => {
    $.ajax(`https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}`)
      .done((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const searchTMDB = (txt) => {
  return new Promise((resolve,reject) => {
    $.ajax(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&query=${txt}&page=1&include_adult=false`)
      .done((result) => {
        resolve(result.results);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const showResults = (searchText) => {
  // dom.domString([singleMovie,singleMovie,singleMovie,singleMovie,]);
  searchTMDB(searchText)
    .then((result) => {
      dom.domString(result, imageConfig);
    })
    .catch((err) => {
      console.error('search error', err);
    });
};

module.exports = {
  showResults,
  setKey,
};
