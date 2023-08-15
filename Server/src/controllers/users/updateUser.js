const { User } = require("../../db");
const { encrypt } = require("./handlers/handleCrypt");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password } = req.body;

    const updateUser = await User.findByPk(id);

    if (name !== undefined && name !== "") {
      updateUser.name = name;
    }
    if (password !== undefined && password !== "") {
      const hashPassword = await encrypt(password);

      updateUser.password = hashPassword;
    }

    if (updateUser.changed()) {
      await updateUser.save();
      return res.status(200).json({ message: "Usuario actualizado con exito" });
    }
    return res.status(200).json({ message: "No hubo cambios para actualizar" });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = updateUser;
