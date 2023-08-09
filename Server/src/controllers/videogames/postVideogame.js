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
    const newVideogame = await Videogame.create({
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
    });

    for (const genreName of genres) {
      const [genre] = await Genre.findOrCreate({
        where: { name: genreName },
      });
      await newVideogame.addGenre(genre);
    }
    const videogameWithGenres = await Videogame.findByPk(newVideogame.id, {
      include: Genre,
    });

    return videogameWithGenres;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = postVideogame;
