import React from "react";
import styles from "./Landig.module.css";
import { Link, useNavigate } from "react-router-dom";

const Landing = ({ loggedIn, setLoggedIn }) => {
  // Obtenemos la funcion navigate la cual nos permitira navegar entre las rutas de nuestro cliente.
  const navigate = useNavigate();

  // creamos una funcion que maneje el estado de cierre se sesión
  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <div className={styles.fondo}>
      <div className={styles.containerLanding}>
        <div className={styles.centerContent}>
          {/* Aca verificamos si estamos logeados o no, si lo estamos mostramos un boton para cerrar sesion y otro para regresar */}
          {loggedIn ? (
            <div>
              <p className={styles.parrafos}>Bienvenido de nuevo!</p>
              <button onClick={handleLogout} className={styles.btnLanding}>
                Cerrar sesión
              </button>
              <Link to={"/home"}>
                <button className={styles.btnLanding}>Regresar</button>
              </Link>
            </div>
          ) : (
            // En caso de que no estemos logeados mostramos un titulo y dos botones, uno para el iniciar sesion y otro para registrarse.
            <div className={styles.btnGroupLanding}>
              <p className={styles.parrafos}>Bienvenido a mi web.</p>
              <Link to="/login">
                <button className={styles.btnLanding}>Iniciar Sesion</button>
              </Link>
              <Link to="/register">
                <button className={styles.btnLanding}>Registrarse</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
