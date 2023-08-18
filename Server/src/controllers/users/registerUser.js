const { User } = require("../../db");
const { encrypt } = require("./handlers/handleCrypt");

const registerUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Faltan datos en la solicitud" });
    }

    const existingUser = await User.findOne({ where: { name } });

    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashPassword = await encrypt(password);
    await User.create({
      name,
      password: hashPassword,
    });

    return res.status(200).json({ message: "Usuario creado con éxito!!!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = registerUser;
