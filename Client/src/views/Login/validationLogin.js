/*
Creamos una funcion que nos sirva para validar el login pasandole como
parametro la informacion del login.
*/
const validationLogin = (loginData) => {
  // Creamos un objeto para almacenar los errores.
  const errors = {};

  // Verificamos si no hay nombre, en ese caso cargamos un error.
  if (!loginData.name) {
    errors.name = "El nombre es necesario";
  }

  // Verificamos si no hay password, en ese caso cargamos un error.
  if (!loginData.password) {
    errors.password = "La password es necesaria";
  }

  // Retornamos el objeto con los errores encontrados.
  return errors;
};

export default validationLogin;
