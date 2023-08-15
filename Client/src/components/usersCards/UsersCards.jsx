import React from "react";
import User from "../user/User";

const UsersCards = ({ users }) => {
  // Destructuramos "videogames" que nos viene por props
  return (
    <div>
      {users.map(({ name, id }) => {
        // Finalmente devolvemos el componente Card con la info necesaria.
        return <User key={id} name={name} id={id} />;
      })}
    </div>
  );
};

export default UsersCards;
