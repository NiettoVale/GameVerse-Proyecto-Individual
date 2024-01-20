import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
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

      const response = await fetch(`http://localhost:3001/users/${id.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        // Use SweetAlert2 for success messages
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: responseData.message,
        });
      } else if (response.status === 500) {
        // Use SweetAlert2 for server error messages
        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: responseData.message,
        });
      }
    } catch (error) {
      // Use SweetAlert2 for general errors
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Algo salió mal!!!",
      });
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
