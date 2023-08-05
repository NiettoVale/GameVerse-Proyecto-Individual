const { Videogame, Genre } = require("../db");

const getAllVideogamesDB = async () => {
  try {
    const videogames = await Videogame.findAll({
      include: { model: Genre, as: "Genres" },
    });

    if (videogames.length === 0) {
      return "No se crearon videojuegos.";
    }

    return videogames;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getAllVideogamesDB;
