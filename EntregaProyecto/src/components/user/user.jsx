import React from "react";
import { Link, useParams } from "react-router-dom";

function Profile(props) {
  let user = props.user;
  console.log(user);
  return (
    <div>
      <h2>Nombre:{user.name}</h2>
      <h3>Usuario:{user.username}</h3>
      <h3>Email:{user.email}</h3>
      <h3>Telefono:{user.phone}</h3>
      <Link to={'/'}><h2>Gallery</h2></Link>
      <Link to={'/productos'}><h2>Lista de Productos</h2></Link>
    </div>
  );
}
export default Profile;
