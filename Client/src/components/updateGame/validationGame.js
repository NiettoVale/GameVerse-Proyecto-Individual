// Creamos una función que valida los datos del juego y devuelve un objeto que contiene errores (si existen).
const validateGame = (gameData) => {
  // Creamos el objeto errors, donde almacenamos los posibles errores.
  const errors = {};

  // Validamos la longitud del nombre del juego
  if (gameData.name.length > 50) {
    errors.name = "El nombre no debe superar los 50 caracteres.";
  }

  // Validamos el rating del juego
  if (isNaN(gameData.rating) || gameData.rating < 1 || gameData.rating > 10) {
    errors.rating = "El rating debe ser un número entre 1 y 10.";
  }

  // Devolvemos el objeto de errores, que estará vacío si no se encontraron errores.
  return errors;
};

export default validateGame;
