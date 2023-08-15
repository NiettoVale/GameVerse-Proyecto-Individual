import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

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
    <div>
      <label htmlFor="name">Nombre: </label>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={userData.name}
      />

      <label htmlFor="password">Password: </label>
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={userData.password}
      />

      <button onClick={handleSubmit}>Actualizar</button>

      <Link to={"/home"}>
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default UpdateUser;
