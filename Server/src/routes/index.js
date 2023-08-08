const { Router } = require("express");
const router = Router();
const getAllVideogamesDB = require("../controllers/getAllVideogamesDB");
const postVideogame = require("../controllers/postVideogame");
const getGenres = require("../controllers/getGenres");
const getVideogameById = require("../controllers/getVideogameById");
const searchVideogamesByName = require("../controllers/searchVideogamesByName");

router.get("/videogames", async (_req, res) => {
  try {
    const videogames = await getAllVideogamesDB();
    return res.status(202).json(videogames);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/videogames", async (req, res) => {
  try {
    const {
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres,
    } = req.body;

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

    await postVideogame(
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres
    );

    return res.status(200).send("Videojuego creado con éxito!!!");
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.get("/genres", async (_req, res) => {
  try {
    const genres = await getGenres();
    return res.status(200).json(genres);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

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
    return res.status(500).send(error.message);
  }
});

router.get("/videogames/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params;
    const infoVideogame = await getVideogameById(idVideogame);
    return res.status(200).send(infoVideogame);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
