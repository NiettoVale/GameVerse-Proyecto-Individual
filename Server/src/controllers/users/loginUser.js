const { User } = require("../../db");
const { compare } = require("./handleCrypt");

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Buscar al usuario por el nombre de usuario en la base de datos
    const user = await User.findOne({ where: { name: name } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const checkPassword = await compare(password, user.password);
    if (checkPassword) {
      // Si las credenciales son correctas, responder con éxito
      return res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = loginUser;
