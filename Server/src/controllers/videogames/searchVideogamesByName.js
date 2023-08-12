const { NAME, API_KEY_NAME } = process.env;
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../../db");
const axios = require("axios");

// Función para buscar videojuegos por nombre:
const searchVideogamesByName = async (name) => {
  try {
    // Convertimos el nombre a minúsculas.
    const nameLowerCase = name.toLowerCase();

    // Buscamos videojuegos en la base de datos que coincidan con el nombre (insensible a mayúsculas/minúsculas)
    const databaseResults = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${nameLowerCase}%`, // Usamos Op.iLike para la búsqueda insensible a mayúsculas/minúsculas
        },
      },
      include: [
        {
          model: Genre,
          attributes: ["name"], // Incluimos solo el nombre del género en los resultados
        },
      ],
    });

    // Realizamos una petición a la API externa para obtener resultados adicionales:
    const { data } = await axios(`${NAME}=${name}${API_KEY_NAME}`);
    const apiResults = data.results.filter((videogame) =>
      videogame.name.toLowerCase().includes(nameLowerCase)
    );

    // Combinamos los resultados de la base de datos y la API, limitar a 15 resultados
    const combinedResults = [...databaseResults, ...apiResults].slice(0, 15);

    return combinedResults; // Devolvemos los resultados combinados
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = searchVideogamesByName;
