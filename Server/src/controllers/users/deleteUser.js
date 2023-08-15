const { User } = require("../../db");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: { id },
    });

    return res.status(200).json({ message: "Usuario eliminado con exito!!!" });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = deleteUser;
