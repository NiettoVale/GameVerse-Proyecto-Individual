import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Form from "./views/Form/Form";
import Detail from "./components/detail/Detail";
import Landing from "./views/Landing/Landing";
import VideogameDB from "./views/VideogameDB/VideogameDB";
import GameName from "./views/GamesByName/GameName";
import Login from "./views/Login/Login";
import Registro from "./views/Login/Register";
import UpdateGame from "./components/updateGame/UpdateGame";
import Users from "./views/Users/Users";
import UpdateUser from "./components/updateUser/updateUser";

const App = () => {
  // Creacion de un estado de para el login:
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {/* Creacion de las rutas de la web: */}
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Registro />} />
        <Route
          path="/"
          element={<Landing loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/createVideogames" element={<VideogameDB />} />
        <Route path="/gameName" element={<GameName />} />
        <Route path="/updategame" element={<UpdateGame />} />
        <Route path="/users" element={<Users />} />
        <Route path="/updateUser/:id" element={<UpdateUser />} />
      </Routes>
    </div>
  );
};

export default App;
