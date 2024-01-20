import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import validationLogin from "./validationLogin";
import Swal from "sweetalert2";

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });

  const [loginErrors, setLoginErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setLoginErrors(
      validationLogin({
        ...loginData,
        [name]: value,
      })
    );
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        setLoggedIn(true);
        navigate("/home");
      } else if (response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: responseData.message,
        });
      } else if (response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Usuario no encontrado",
          text: responseData.message,
        });
      } else if (response.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: responseData.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Algo salió mal.",
      });
      console.log(error.message);
    }
  };

  const areAllFieldsFilled = () => {
    const requiredFields = ["name", "password"];
    return requiredFields.every((field) => loginData[field] !== "");
  };

  return (
    <div>
      <div className={styles.containerLogin}>
        <div className={styles.secondaryContainer}>
          <h2 className={styles.title}>Iniciar Sesión</h2>

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={loginData.name}
              onChange={handleChange}
              placeholder="Nombre de usuario"
            />
            {loginErrors.name && (
              <p className={styles.error}>{loginErrors.name}</p>
            )}

            <input
              className={styles.input}
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Contraseña"
            />
            {loginErrors.invalidPassword ? (
              <p className={styles.error}>{loginErrors.invalidPassword}</p>
            ) : loginErrors.userNotFound ? (
              <p className={styles.error}>{loginErrors.userNotFound}</p>
            ) : (
              loginErrors.password && (
                <p className={styles.error}>{loginErrors.password}</p>
              )
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={`${styles.loginButton} ${
                !areAllFieldsFilled() ? styles.disable : ""
              }`}
              onClick={handleLogin}
              disabled={!areAllFieldsFilled()}
            >
              Iniciar sesión
            </button>
            <Link to="/register">
              <button className={styles.registerButton}>Registrarse</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
