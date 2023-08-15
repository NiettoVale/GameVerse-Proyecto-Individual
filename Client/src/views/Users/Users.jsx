import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerUsuarios } from "../../redux/actions";
import UsersCards from "../../components/usersCards/UsersCards";
import { Link } from "react-router-dom";
import styles from "../../components/user/User.module.css";

const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerUsuarios());
  }, [dispatch]);

  return (
    <div>
      <Link to={"/home"}>
        <button className={styles.btnVolver}>Volver</button>
      </Link>

      <div className={styles.tableRow}>
        <div className={styles.tableCellHeader}>ID</div>
        <div className={styles.tableCellHeader}>Nombre</div>
        <div className={styles.tableCellHeader}>Acciones</div>
        <div className={styles.tableCellHeader}>Acciones</div>
      </div>
      <UsersCards users={users} />
    </div>
  );
};

export default Users;
