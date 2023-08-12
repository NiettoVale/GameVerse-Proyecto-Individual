// Importar el modelo User de la base de datos y la función de encriptación
const { User } = require("../../db");
const { encrypt } = require("./handleCrypt");

const registerUser = async (req, res) => {
  try {
    // Extraemos la información que nos llega por body.
    const { name, password } = req.body;

    // Verificamos si el nombre y la contraseña están presentes en el cuerpo de la solicitud.
    if (!name || !password) {
      return res.status(400).json({ message: "Faltan datos en la solicitud" });
    }

    // Verificamos si ya existe un usuario con el mismo nombre.
    const existingUser = await User.findOne({ where: { name: name } });

    if (existingUser) {
      // Si existe lo informamos.
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // En caso de que no exista, encriptamos la contraseña.
    const hashPassword = await encrypt(password);

    // Creamos un nuevo usuario en la base de datos.
    await User.create({
      name,
      password: hashPassword,
    });

    // Respondemos con un mensaje de éxito
    return res.status(200).json({ message: "Usuario creado con éxito!!!" });
  } catch (error) {
    // Informamos si ocurrio algun error.
    return res.status(500).json({ error: error.message });
  }
};

module.exports = registerUser;
