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
      const [genre] = await Genre.findOrCreate({
        where: { name: genreName },
      });

      // Agregamos la relación de género al videojuego
      await newVideogame.addGenre(genre);
    }

    // Obtenemos el videojuego recién creado con los géneros asociados
    const videogameWithGenres = await Videogame.findByPk(newVideogame.id, {
      include: Genre,
    });

    return videogameWithGenres;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = postVideogame; // Exportar la función
