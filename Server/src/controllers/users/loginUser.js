const { User } = require("../../db");
const { compare } = require("./handleCrypt");

const loginUser = async (req, res) => {
  try {
    // Extraemos los datos que recibimos por body.
    const { name, password } = req.body;

    // Buscamos al usuario por el nombre de usuario en la base de datos.
    const user = await User.findOne({ where: { name: name } });

    if (!user) {
      // Si no existe el usuario en la base de datos, lo informamos.
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si existe un usuario verificamos si las contraseñas coinciden:
    const checkPassword = await compare(password, user.password);

    if (checkPassword) {
      // Si las contraseñas son correctas
      return res.status(200).json({ message: "Inicio de sesion exitoso" });
    } else {
      // Caso contrario los informamos:
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
  } catch (error) {
    // Si hubo algún error lo informamos:
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = loginUser;
