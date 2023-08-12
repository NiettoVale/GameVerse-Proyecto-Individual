// Creamos una función que valida un formulario con los datos de un juego
// y devuelve un objeto que contiene errores (si los hay).

const validateForm = (formData) => {
  // Creamos un objeto para almacenar los posibles errores.
  const errors = {};

  // Validamos si el nombre está presente.
  if (!formData.name) {
    errors.name = "El nombre es requerido.";
  } else if (formData.name.length > 50) {
    errors.name = "El nombre no debe superar los 50 caracteres.";
  }

  // Validamos si la descripción está presente y no contiene comillas dobles
  if (!formData.description) {
    errors.description = "La descripción es requerida.";
  } else if (formData.description.includes('"')) {
    errors.description = "La descripción no debe contener comillas dobles.";
  }

  // Validamos si la URL de la imagen de fondo está presente y es válida
  if (!formData.background_image) {
    errors.background_image = "La URL de la imagen de fondo es requerida.";
  } else if (!isValidUrl(formData.background_image)) {
    errors.background_image = "La URL de la imagen no es válida.";
  }

  // Validamos si el rating es un número entre 1 y 10
  if (isNaN(formData.rating) || formData.rating < 1 || formData.rating > 10) {
    errors.rating = "El rating debe ser un número entre 1 y 10.";
  }

  // Validamos si las plataformas están presentes
  if (!formData.platforms) {
    errors.platforms = "Las plataformas son requeridas.";
  }

  // Validamos si la fecha de lanzamiento está presente
  if (!formData.released) {
    errors.released = "La fecha es requerida.";
  }

  // Devolver el objeto de errores, que estará vacío si no se encontraron errores.
  return errors;
};

// Creamos una funcion para validar una URL usando un regex.
const isValidUrl = (url) => {
  const urlPattern =
    // eslint-disable-next-line no-useless-escape
    /^https:\/\/[a-zA-Z0-9\-_.]+\/[a-zA-Z0-9\-_\/]+\/[a-zA-Z0-9\-_]+\.(jpg|png|gif|jpeg)\?s=[a-zA-Z]+$/;

  return urlPattern.test(url);
};

export default validateForm;
