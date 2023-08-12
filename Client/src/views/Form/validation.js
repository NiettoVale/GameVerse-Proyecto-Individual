const validateForm = (formData) => {
  const errors = {};

  if (!formData.name) {
    errors.name = "El nombre es requerido.";
  } else if (formData.name.length > 50) {
    errors.name = "El nombre no debe superar los 50 caracteres.";
  }

  if (!formData.description) {
    errors.description = "La descripción es requerida.";
  } else if (formData.description.includes('"')) {
    errors.description = "La descripción no debe contener comillas dobles.";
  }

  if (!formData.background_image) {
    errors.background_image = "La URL de la imagen de fondo es requerida.";
  } else if (!isValidUrl(formData.background_image)) {
    errors.background_image = "La URL de la imagen no es válida.";
  }

  if (isNaN(formData.rating) || formData.rating < 1 || formData.rating > 10) {
    errors.rating = "El rating debe ser un número entre 1 y 10.";
  }

  if (!formData.platforms) {
    errors.platforms = "Las plataformas son requeridas.";
  }

  if (!formData.released) {
    errors.released = "La fecha es requerida.";
  }

  return errors;
};

const isValidUrl = (url) => {
  const urlPattern =
    // eslint-disable-next-line no-useless-escape
    /^https:\/\/[a-zA-Z0-9\-_.]+\/[a-zA-Z0-9\-_\/]+\/[a-zA-Z0-9\-_]+\.(jpg|png|gif|jpeg)\?s=[a-zA-Z]+$/;

  return urlPattern.test(url);
};

export default validateForm;
