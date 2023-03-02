import React from "react";
import { Link, useParams } from "react-router-dom";

function producto(props) {
  const { productoId } = useParams();
  let producto = props.productos[productoId - 1];
  return (
    <div>
      <h2>Nombre:{producto.title}</h2>
      <h3>Marca:{producto.brand}</h3>
      <h3>Precio:{producto.price}</h3>
      <img className="homeimg" src={producto.thumbnail} alt="Producto logo" />
      <Link to={'/'}><h2>Gallery</h2></Link>
      <Link to={'/productos'}><h2>Lista de Productos</h2></Link>
    </div>
  );
}
export default producto;
