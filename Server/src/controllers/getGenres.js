const { Genre } = require("../db.js");
const axios = require("axios");
const { GENRES, API_KEY } = process.env;

const getGenres = async () => {
  try {
    const count = await Genre.count();

    if (count === 0) {
      const { data } = await axios(`${GENRES}${API_KEY}`);
      const generos = data.results.map((Genre) => {
        return { name: Genre.name };
      });
      await Genre.bulkCreate(generos);
    }

    const allGenres = await Genre.findAll({
      attributes: ["name"],
    });
    return allGenres.map((genre) => genre.name);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getGenres;
