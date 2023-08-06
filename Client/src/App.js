import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Form from "./views/Form/Form";
import Detail from "./components/detail/Detail";
import Landing from "./views/Landing/Landing";
import VideogameDB from "./views/VideogameDB/VideogameDB";
import GameName from "./views/GamesByName/GameName";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />{" "}
        <Route path="/form" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/createVideogames" element={<VideogameDB />} />
        <Route path="/gameName" element={<GameName />} />
      </Routes>
    </div>
  );
};

export default App;
