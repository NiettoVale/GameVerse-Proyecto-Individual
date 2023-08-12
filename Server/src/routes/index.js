const { Router } = require("express");
const router = Router();
const getAllVideogamesDB = require("../controllers/videogames/getAllVideogamesDB");
const postVideogame = require("../controllers/videogames/postVideogame");
const getGenres = require("../controllers/videogames/getGenres");
const getVideogameById = require("../controllers/videogames/getVideogameById");
const searchVideogamesByName = require("../controllers/videogames/searchVideogamesByName");
const deleteVideogame = require("../controllers/videogames/deleteVideogame");
const updateVideogame = require("../controllers/videogames/updateVideogame");
const loginUser = require("../controllers/users/loginUser");
const registerUser = require("../controllers/users/registerUser");

// Ruta para obtener todos los juegos de la base de datos.
router.get("/videogames", async (_req, res) => {
  try {
    const videogames = await getAllVideogamesDB();
    return res.status(200).json(videogames);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Ruta para crear un nuevo videojuego.
router.post("/videogames", async (req, res) => {
  try {
    // Extraemos la informacion que nos llega por body.
    const {
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres,
    } = req.body;

    // Verificamos si falta alguna propiedad.
    if (
      !name ||
      !description ||
      !platforms ||
      !background_image ||
      !released ||
      !rating ||
      !Array.isArray(genres)
    ) {
      throw new Error("Faltan datos o el formato es incorrecto!!!");
    }

    // Si no falta ninguna propiedad creamos el juego.
    await postVideogame(
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres
    );

    return res.status(200).json({ message: "Videojuego creado con éxito!!!" });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

// Ruta para obtener los juegos.
router.get("/genres", async (_req, res) => {
  try {
    const genres = await getGenres();
    return res.status(200).json(genres);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Ruta para obtener los juegos por un nombre en especifico.
router.get("/videogames/name", async (req, res) => {
  try {
    const { name } = req.query;

    if (name !== undefined) {
      const videogames = await searchVideogamesByName(name);

      if (videogames.length === 0) {
        return res.status(404).json({
          error: "No se encontraron videojuegos con esa palabra en el nombre.",
        });
      }

      return res.status(200).send(videogames);
    }
  } catch (error) {
    return res.status(500).send({ error: "Error del servidor" });
  }
});

// Ruta para obtener los juegos mediante un id:
router.get("/videogames/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params;
    const infoVideogame = await getVideogameById(idVideogame);
    return res.status(200).send(infoVideogame);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Extra 1: Delete videogame:
router.delete("/videogames/:id", deleteVideogame);

// Extra 2: Update videogame:
router.put("/videogames/:id", updateVideogame);

// Extra 3: Configuracion de los users:
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
