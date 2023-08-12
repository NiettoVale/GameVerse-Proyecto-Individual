const { Genre } = require("../../db");
const { GENRES, API_KEY } = process.env;
const axios = require("axios");

const getGenres = async () => {
  try {
    // Contamos cuántos géneros ya existen en la base de datos.
    const count = await Genre.count();

    // Si no hay géneros en la base de datos, obtener los géneros de la API externa
    if (count === 0) {
      const { data } = await axios(`${GENRES}${API_KEY}`);

      // Guardamos los géneros en un arreglo.
      const genres = data.results.map((genre) => {
        return { name: genre.name };
      });

      // Creamos múltiples registros de género en la base de datos
      await Genre.bulkCreate(genres);
    }

    // Obtenemos todos los géneros de la base de datos.
    const allGenres = await Genre.findAll({
      attributes: ["name"],
    });

    // Devolvemos un array de nombres de géneros.
    return allGenres.map((genre) => genre.name);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getGenres;
