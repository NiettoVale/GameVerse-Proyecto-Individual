const { Videogame } = require("../../db");

const updateVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, platforms, background_image, released, rating } =
      req.body;

    const updateProject = await Videogame.findByPk(id);

    // Verifico propiedades y actualizo si existen:
    if (name !== undefined) {
      updateProject.name = name;
    }
    if (description !== undefined) {
      updateProject.description = description;
    }
    if (platforms !== undefined) {
      updateProject.platforms = platforms;
    }
    if (background_image !== undefined) {
      updateProject.background_image = background_image;
    }
    if (released !== undefined) {
      updateProject.released = released;
    }
    if (rating !== undefined) {
      updateProject.rating = rating;
    }

    // Guardo los cambios si se realizaron:
    if (updateProject.changed()) {
      await updateProject.save();

      return res.status(200).json({ message: "Videojuego Actualizado" });
    } else {
      return res
        .status(200)
        .json({ message: "No hubo cambios para actualizar" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error interno del server" });
  }
};

module.exports = updateVideogame;
