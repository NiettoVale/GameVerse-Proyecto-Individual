import React from "react";
import styles from "./Landig.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={styles.fondo}>
      <div className={styles.containerLanding}>
        <div className={styles.centerContent}>
          <Link to={"/home"}>
            <button className={styles.btnLanding}>Entrar en la web</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
