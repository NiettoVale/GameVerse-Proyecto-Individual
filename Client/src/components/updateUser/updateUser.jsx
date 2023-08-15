import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./UpdateUser.module.css";

const UpdateUser = () => {
  const id = useParams();
  const [userData, setUserData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // Realizar la petición al servidor
      const response = await fetch(`http://localhost:3001/users/${id.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        alert(responseData.message);
      } else if (response.status === 500) {
        alert(responseData.message);
      }
    } catch (error) {
      alert("Algo salio mal!!!");
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <label htmlFor="name" className={styles.labelUpdate}>
          Nombre:{" "}
        </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={userData.name}
          className={styles.inputUpdate}
        />
        <label htmlFor="password" className={styles.labelUpdate}>
          Password:{" "}
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={userData.password}
          className={styles.inputUpdate}
        />
        <div className={styles.buttonContainer}>
          {" "}
          {/* Contenedor para los botones */}
          <button onClick={handleSubmit} className={styles.buttonUpdate}>
            Actualizar
          </button>
          <Link to={"/users"}>
            <button className={styles.buttonUpdate}>Volver</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
