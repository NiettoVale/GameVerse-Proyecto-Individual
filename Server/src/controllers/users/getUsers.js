const { User } = require("../../db");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ order: [["id", "ASC"]] });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = getUsers;
