import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import validationLogin from "./validationLogin";

const Login = ({ setLoggedIn }) => {
  // Obtenemos la funcion navigate la cual nos permitira navegar entre las rutas de nuestro cliente.
  const navigate = useNavigate();

  // Creamos un estado local para almacenar la informacion del login.
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });

  // Creamos un estado local para almacenar los errores que se presenten en el login.
  const [loginErrors, setLoginErrors] = useState({});

  // Creamos una funcion que maneje los cambios en los inputs
  const handleChange = (event) => {
    // Destructuramos dos propiedades de target -> (name, value)
    const { name, value } = event.target;
    // Seteamos la informacion del usuario en su propiedd correspondiente.
    setLoginData((prevData) => ({
      //Tomamos la informacion anterior del usuario y la guardamos junto con el cambio realizado
      ...prevData,
      [name]: value,
    }));

    // Seteamos errores que puedan surgir al intentar el login.
    setLoginErrors(
      // llamamos a la funcion validar y le pasamos el nuevo usuario y los cambios que se registraron.
      validationLogin({
        ...loginData,
        [name]: value,
      })
    );
  };

  // Creamos una funcion que se ejecuta cuando iniciamos sesion.
  const handleLogin = async () => {
    try {
      // Realizamos una peticion al backend usando fetch y pasando la informacion del login.
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Obtenemos los datos de la respuesta de la peticion y los almacenamos
      const responseData = await response.json();

      // Verificamos el estado de las posibles respuestas del servidor y mostramos adecuadamente los mensajes:
      if (response.status === 200) {
        setLoggedIn(true);
        navigate("/home");
      } else if (response.status === 401) {
        setLoginErrors({ invalidPassword: responseData.message });
      } else if (response.status === 404) {
        setLoginErrors({ userNotFound: responseData.message });
      } else if (response.status === 500) {
        setLoginErrors({ serverError: responseData.message });
      }
    } catch (error) {
      // Si hubo algun error que no es del servidor lo mostramos
      alert("Algo salio mal.");
      console.log(error.message);
    }
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
            <button className={styles.loginButton} onClick={handleLogin}>
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
