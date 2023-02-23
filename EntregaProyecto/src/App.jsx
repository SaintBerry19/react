import { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/navbar/navbar";
import Bienvenida from "./components/bienvenida/bienvenida";
import axios from "axios";
import ContenedorProductos from "./components/contenedorProductos/contenedorProductos";
import { addProduct, removeProduct } from "./globalFunctions/globalFunctions";
import Productos from "./components/tablaProductos/tablaproductos";

function App() {
  const [user, setUser] = useState([]);
  const [productos, setProductos] = useState([]);
  const [contador, setContador] = useState(0);
  const [add, setAdd] = useState(true);
  const [remove, setRemove] = useState(true);

  const getCarrito = () => {
    setContador(0);
  };

  const getUser = async () => {
    let resp = await axios.get(`https://jsonplaceholder.typicode.com/users/1`);
    setUser(resp.data);
  };

  const getProductos = async () => {
    let resp = await axios.get(`https://dummyjson.com/products`);
    setProductos(resp.data.products);
  };

  useEffect(() => {
    getCarrito();
    getUser();
    getProductos();
  }, []); //[] para que solo se ejecute una vez

  useEffect(() => {
    contador < 1 ? setContador(0) : setContador(removeProduct(contador));
  }, [remove]);

  useEffect(() => {
    setContador(addProduct(contador));
  }, [add]);

  return (
    <div className="App">
      <div>
        <NavBar contador={contador} />
      </div>
      <div className="container">
        <a href="https://www.instagram.com/mobastudio.mx/" target="_blank">
          <img className="logo" src="/moba-studio.jpg" alt="MOBA logo" />
        </a>
        <Bienvenida usuario={user.name} username={user.username} />
      </div>

      <Productos/>
      <div className="lista_container">
        <h2>Productos Array</h2>
        <ContenedorProductos
          productos={productos}
          setAdd={setAdd}
          add={add}
          setRemove={setRemove}
          remove={remove}
        />
      </div>
    </div>
  );
}

export default App;
