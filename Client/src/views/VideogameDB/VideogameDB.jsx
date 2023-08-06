import React, { useEffect, useState } from "react"; // Importa los módulos necesarios de React.
import { Link } from "react-router-dom"; // Importa el componente Link de react-router-dom para manejar la navegación.
import axios from "axios"; // Importa el módulo axios para realizar peticiones HTTP.
import Cards from "../../components/cards/Cards"; // Importa el componente Cards desde el directorio relativo.
import styles from "./VideogameDB.module.css";

const VideoGamesComponent = () => {
  const [data, setData] = useState([]); // Declara el estado 'data' como un arreglo vacío y la función 'setData' para actualizar dicho estado.

  useEffect(() => {
    // Efecto secundario que se ejecuta después del montaje del componente.
    const fetchData = async () => {
      // Declara una función asincrónica fetchData para obtener los datos de la API.
      try {
        const response = await axios.get("http://localhost:3001/videogames"); // Realiza una petición GET a la API para obtener los datos de los videojuegos.
        const modifiedData = response.data.map((item) => {
          // Modifica los datos recibidos de la API mapeando cada objeto en la respuesta.
          const { Genres, ...rest } = item; // Utiliza la destructuración para extraer la propiedad 'Genres' del objeto actual y asigna el resto a 'rest'.
          return { ...rest, genres: Genres }; // Crea un nuevo objeto con las propiedades originales del objeto ('rest') y agrega una nueva propiedad 'genres' con el valor de 'Genres'.
        });
        setData(modifiedData); // Actualiza el estado 'data' con los datos modificados.
      } catch (error) {
        console.error("Error fetching data:", error); // En caso de error, muestra un mensaje en la consola indicando el error.
      }
    };

    fetchData(); // Llama a la función fetchData para obtener los datos cuando el componente se monta.
  }, []); // El arreglo de dependencias vacío [] asegura que este efecto solo se ejecute una vez al montar el componente.

  return (
    <div>
      {data.length === 0 ? (
        <div>
          <p>No se crearon videojuegos.</p>
          <Link to={"/form"}>
            <button>Crear videojuego</button>
          </Link>
        </div>
      ) : (
        <div>
          <div className={styles.headerContainer}>
            <h1>VIDEOJUEGOS CREADOS:</h1>
            <Link to={"/home"}>
              <button className={styles.btnDB}>Volver</button>
            </Link>
          </div>
          <Cards videogames={data} />
        </div>
      )}
    </div>
  );
};

export default VideoGamesComponent; // Exporta el componente VideoGamesComponent.
