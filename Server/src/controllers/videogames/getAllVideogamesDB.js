const { Videogame, Genre } = require("../../db");

const getAllVideogamesDB = async () => {
  try {
    // Con el metodo "findAll" hacemos una busqueda completa en la base de datos, incluyendo los generos.
    const videogames = await Videogame.findAll({
      include: { model: Genre },
    });

    // Si el largo del arreglo de los videojuegos es 0 significa que no hay ningun juego almacenado.
    if (videogames.length === 0) {
      return { error: "No se crearon videojuegos." };
    }

    return videogames;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getAllVideogamesDB;
