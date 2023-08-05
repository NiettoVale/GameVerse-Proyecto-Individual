const { NAME, API_KEY_NAME } = process.env;
const { Op } = require("sequelize");
const { Videogame } = require("../db");
const axios = require("axios");

const searchVideogamesByName = async (name) => {
  try {
    const nameLowerCase = name.toLowerCase();
    const databaseResults = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${nameLowerCase}%`,
        },
      },
    });
    const { data } = await axios(`${NAME}=${name}${API_KEY_NAME}`);
    const apiResults = data.results.filter((videojuego) =>
      videojuego.name.toLowerCase().includes(nameLowerCase)
    );
    const combinedResults = [...databaseResults, ...apiResults].slice(0, 15);

    return combinedResults;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = searchVideogamesByName;
