import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import validationRegister from "./validationRegister";

const Registro = () => {
  // Creamos un estado local para almacenar al nuevo usuario
  const [newUser, setNewUser] = useState({
    // estas son las propiedades necesarias para crear al nuevo usuario
    name: "",
    password: "",
  });

  // Creamos un estado local para almacenar los errores que surgan mediante la validacion.
  const [registerErrors, setRegisterErrors] = useState({});

  // Creamos una funcion que maneja los cambios de los inputs
  const handleChange = (event) => {
    // destructuramos dos valores de target -> (name, value)
    const { name, value } = event.target;

    // Seteamos la informacion del nuevo usuario
    setNewUser((prevData) => ({
      //tomamos la informacion anterior del usuario y la guardamos junto con el cambio realizado
      ...prevData,
      [name]: value,
    }));

    // Seteamos errores que puedan surgir al registrar al usuario.
    setRegisterErrors(
      // llamamos a la funcion validar y le pasamos el nuevo usuario y los cambios que se registraron.
      validationRegister({
        ...newUser,
        [name]: value,
      })
    );
  };

  // Creamos una funcion que se ejecuta cuando enviamos el formulario.
  const handleSubmit = async () => {
    try {
      // Realizamos una peticion al backend usando fetch y le pasamos el metodo y lo que le queremos enviar.
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      // Obtenemos los datos de la respuesta de la peticion y los almacenamos
      const responseData = await response.json();

      // Verificamos el estado de las posibles respuestas del servidor y mostramos adecuadamente los mensajes:
      if (response.status === 200) {
        alert(responseData.message);
        window.location.reload();
      } else if (response.status === 400) {
        setRegisterErrors({ badRequest: responseData.message });
      } else if (response.status === 500) {
        setRegisterErrors({ serverError: responseData.message });
      }
    } catch (error) {
      // Si hubo algun error que no es del servidor lo mostramos
      alert("Algo salio mal.");
      console.log(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={styles.title}>Registro</h2>

        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            placeholder="Nombre de usuario"
          />
          {registerErrors.invalidName && (
            <p className={styles.error}>{registerErrors.invalidName}</p>
          )}
          <input
            className={styles.input}
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            placeholder="Contraseña"
          />
          {registerErrors.badRequest ? (
            <p className={styles.error}>{registerErrors.badRequest}</p>
          ) : (
            registerErrors.invalidPassword && (
              <p className={styles.error}>{registerErrors.invalidPassword}</p>
            )
          )}
        </div>
        <button className={styles.button} onClick={handleSubmit}>
          Registrar
        </button>

        <Link to={"/login"}>
          <button className={styles.button}>Iniciar Sesion</button>
        </Link>
      </div>
    </div>
  );
};

export default Registro;
