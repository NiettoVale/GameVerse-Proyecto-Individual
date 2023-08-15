import React from "react";
import styles from "./User.module.css";
import { Link } from "react-router-dom";

const User = ({ name, id }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
      });

      const responseData = await response.json();

      if (response.status === 200) {
        alert(responseData.message);
        window.location.reload();
      } else if (response.status === 500) {
        alert(responseData.message);
        window.location.reload();
      }
    } catch (error) {
      alert("Algo salio mal!!!");
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className={styles.tableRow}>
        <div className={styles.tableCell}>{id}</div>
        <div className={styles.tableCell}>{name}</div>
        <div className={styles.tableCell}>
          <div className={styles.centerContent}>
            <Link to={`/updateUser/${id}`}>
              <button className={styles.updateUser}>Actualizar Usuario</button>
            </Link>
          </div>
        </div>
        <div className={styles.tableCell}>
          <div className={styles.centerContent}>
            <button onClick={handleDelete} className={styles.deleteUser}>
              Eliminar usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
