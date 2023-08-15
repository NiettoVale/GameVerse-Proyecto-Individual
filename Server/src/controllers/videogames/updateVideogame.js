const { Videogame } = require("../../db");

const updateVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, platforms, background_image, released, rating } =
      req.body;

    const updateVideogame = await Videogame.findByPk(id);

    // Verificamos si los valores son undefined o vacíos y realizamos la actualización si son diferentes.
    if (name !== undefined && name !== "") {
      updateVideogame.name = name;
    }
    if (description !== undefined && description !== "") {
      updateVideogame.description = description;
    }
    if (platforms !== undefined && platforms !== "") {
      updateVideogame.platforms = platforms;
    }
    if (background_image !== undefined && background_image !== "") {
      updateVideogame.background_image = background_image;
    }
    if (released !== undefined && released !== "") {
      updateVideogame.released = released;
    }
    if (rating !== undefined && rating !== "") {
      updateVideogame.rating = rating;
    }

    // Verificamos si se realizaron cambios y guardamos dichos cambios si es necesario.
    if (updateVideogame.changed()) {
      await updateVideogame.save();
      return res.status(200).json({ message: "Videojuego Actualizado" });
    } else {
      return res
        .status(200)
        .json({ message: "No hubo cambios para actualizar" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error interno del server" });
  }
};

module.exports = updateVideogame;
