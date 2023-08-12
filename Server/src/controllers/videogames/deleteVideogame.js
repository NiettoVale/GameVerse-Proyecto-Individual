const { Videogame } = require("../../db");

const deleteVideogame = async (req, res) => {
  try {
    // Extraemos el id que viene por params.
    const { id } = req.params;

    // Con el metodo destroy eliminamos el juego de la base de datos en base al ID.
    await Videogame.destroy({
      where: {
        id,
      },
    });

    // Retornamos una respuesta exitosa.
    return res
      .status(200)
      .json({ message: "Videojuego eliminado con exito!!!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteVideogame;
