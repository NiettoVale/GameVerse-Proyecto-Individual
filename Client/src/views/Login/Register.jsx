import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import validationRegister from "./validationRegister";
import Swal from "sweetalert2";

const Registro = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    password: "",
  });

  const [registerErrors, setRegisterErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setRegisterErrors(
      validationRegister({
        ...newUser,
        [name]: value,
      })
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: responseData.message,
        }).then(() => {
          window.location.reload();
        });
      } else if (response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Error en la solicitud",
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
          <button className={styles.button}>Iniciar Sesión</button>
        </Link>
      </div>
    </div>
  );
};

export default Registro;
