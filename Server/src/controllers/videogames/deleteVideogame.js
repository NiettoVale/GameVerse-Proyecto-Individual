const { Videogame } = require("../../db");

const deleteVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    await Videogame.destroy({
      where: {
        id,
      },
    });

    return res
      .status(200)
      .json({ message: "Videojuego eliminado con exito!!!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteVideogame;
