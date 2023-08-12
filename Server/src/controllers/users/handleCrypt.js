// Importamos la librería bcryptjs para el manejo de encriptación de contraseñas.
const bcrypt = require("bcryptjs");

// Creamos una función para encriptar una contraseña
const encrypt = async (textPlain) => {
  // Generamos un hash utilizando bcrypt y 10 rounds de salting (ajuste de dificultad)
  const hash = await bcrypt.hash(textPlain, 10);
  return hash; // Devolvemos el hash resultante
};

// Creamos un función para comparar una contraseña en texto plano con un hash de contraseña
const compare = async (passswordPlain, hashPassword) => {
  // Comparamos la contraseña en texto plano con el hash de contraseña usando bcrypt
  return await bcrypt.compare(passswordPlain, hashPassword);
  // Devolvemos true si la comparación es exitosa (las contraseñas coinciden), de lo contrario, devolvemos false
};

module.exports = { encrypt, compare };
