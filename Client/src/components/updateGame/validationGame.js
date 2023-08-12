const validateGame = (gameData) => {
  const errors = {};

  if (gameData.name.length > 50) {
    errors.name = "El nombre no debe superar los 50 caracteres.";
  }

  if (isNaN(gameData.rating) || gameData.rating < 1 || gameData.rating > 10) {
    errors.rating = "El rating debe ser un número entre 1 y 10.";
  }

  return errors;
};

export default validateGame;
