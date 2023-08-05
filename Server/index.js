const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  console.log("Base de datos conectada.");
  server.listen(3001, () => {
    console.log("Servidor iniciado con exito.");
  });
});
