import React from "react";

function ContenedorProductos(props) {
  return (
    <ul>
      {props.productos.map((producto, index) => (
        <li key={index + producto}>
          {producto.title}
          <button onClick={() => props.setRemove(!props.remove)}>-</button>
          <button onClick={() => props.setAdd(!props.add)}>+</button>
        </li>
      ))}
    </ul>
  );
}

export default ContenedorProductos;
