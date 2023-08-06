const { Videogame, Genre } = require("../db");

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
    const newVideogame = await Videogame.create({
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
    });

    for (const generoName of genres) {
      const [genero] = await Genre.findOrCreate({
        where: { name: generoName },
      });
      await newVideogame.addGenre(genero);
    }
    const videojuegoCongenres = await Videogame.findByPk(newVideogame.id, {
      include: Genre,
    });

    return videojuegoCongenres;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = postVideogame;
