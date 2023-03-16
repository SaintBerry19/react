import React from "react";
import { Link, useParams } from "react-router-dom";


function producto(props) {
  let { productoId } = useParams();
  productoId = Number(productoId)
  let productos = props.productos;
  let selectedProduct = []
  for (let producto of productos) {
    if (producto.id === productoId){
      selectedProduct.push(producto)
    }
  }
  let displayProduct = selectedProduct[0]

  return (
    <div>
      <h2>Nombre:{displayProduct.title}</h2>
      <h3>Marca:{displayProduct.brand}</h3>
      <h3>Precio:{displayProduct.price}</h3>
      <img className="homeimg" src={displayProduct.thumbnail} alt="Producto logo" />
      <Link to={"/"}>
        <h2>Gallery</h2>
      </Link>
      <Link to={"/productos"}>
        <h2>Lista de Productos</h2>
      </Link>
    </div>
  );
}
export default producto;
