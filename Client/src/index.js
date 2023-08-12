import React from "react";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";

// Crear un root usando createRoot y renderizar la aplicación
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* Proporcionar el store global a la aplicación */}
    <BrowserRouter>
      {/* Utilizar el enrutador de react-router-dom */}
      <App /> {/* Renderizar el componente principal de la aplicación */}
    </BrowserRouter>
  </Provider>
);
