import React from "react";
import NavBar from "../../components/navBar/NavBar";
import Cards from "../../components/cards/Cards";
import "./Home.module.css";
import styles from "./Home.module.css";

const Home = ({ videogames }) => {
  return (
    <div>
      <NavBar />
      <div className={styles.contenedorFiltros}>
        <button>Ordenar Ascendente A-Z</button>
        <button>Ordenar Descendente A-Z</button>
        <button>Ordenar Ascendente Rating</button>
        <button>Ordenar Descendente Rating</button>
      </div>
      <div className="Contenedor de las cards">
        <Cards videogames={videogames} />
      </div>
    </div>
  );
};

export default Home;
