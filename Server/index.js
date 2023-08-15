require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  console.log("Base de datos conectada.");
  server.listen(PORT, () => {
    console.log(`Servidor iniciado con exito en el puerto ${PORT}.`);
  });
});
