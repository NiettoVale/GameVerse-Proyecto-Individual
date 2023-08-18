const { Videogame, Genre } = require("../../db");

const postVideogame = async (
  name,
  description,
  platforms,
  background_image,
  released,
  rating,
  genres
) => {
  try {
    // Creamos un nuevo registro de videojuego en la base de datos
    const newVideogame = await Videogame.create({
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
    });

    // Para cada nombre de género, lo buscamos en la base de datos.
    for (const genreName of genres) {
      const genre = await Genre.findOne({
        where: { name: genreName },
      });

      await newVideogame.addGenre(genre);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = postVideogame;
