const { User } = require("../../db");
const { encrypt } = require("./handleCrypt");

const registerUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const hashPassword = await encrypt(password);
    await User.create({
      name,
      password: hashPassword,
    });

    return res.status(200).json({ message: "Usuario creado con exito!!!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = registerUser;
