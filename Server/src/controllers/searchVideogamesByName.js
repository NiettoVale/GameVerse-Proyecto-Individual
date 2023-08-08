const { NAME, API_KEY_NAME } = process.env;
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");
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
      include: [
        {
          model: Genre,
          attributes: ["name"], // Incluir solo el nombre del género en los resultados
        },
      ],
    });

    const { data } = await axios(`${NAME}=${name}${API_KEY_NAME}`);
    const apiResults = data.results.filter((videojuego) =>
      videojuego.name.toLowerCase().includes(nameLowerCase)
    );

    // Mapear los resultados de la API para tener una estructura similar a la de la base de datos
    const apiResultsWithGenres = apiResults.map((videojuego) => ({
      id: videojuego.id,
      name: videojuego.name,
      background_image: videojuego.background_image,
      rating: videojuego.rating,
      genres: videojuego.genres.map((genre) => ({ name: genre.name })),
    }));

    const combinedResults = [...databaseResults, ...apiResultsWithGenres].slice(
      0,
      15
    );

    return combinedResults;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = searchVideogamesByName;
