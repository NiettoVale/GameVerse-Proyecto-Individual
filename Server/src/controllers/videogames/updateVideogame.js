const { Videogame } = require("../../db");

const updateVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, platforms, background_image, released, rating } =
      req.body;

    const updateProject = await Videogame.findByPk(id);
    console.log("Antes de actualizar:");
    console.log(updateProject);

    // Verifica si los valores son undefined o vacíos y realiza la actualización si son diferentes
    if (name !== undefined && name !== "") {
      updateProject.name = name;
    }
    if (description !== undefined && description !== "") {
      updateProject.description = description;
    }
    if (platforms !== undefined && platforms !== "") {
      updateProject.platforms = platforms;
    }
    if (background_image !== undefined && background_image !== "") {
      updateProject.background_image = background_image;
    }
    if (released !== undefined && released !== "") {
      updateProject.released = released;
    }
    if (rating !== undefined && rating !== "") {
      updateProject.rating = rating;
    }

    console.log("Despues de actualizar:");
    console.log(updateProject);
    // Verifica si se realizaron cambios y guarda los cambios si es necesario
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
