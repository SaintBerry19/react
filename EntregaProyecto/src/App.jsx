import { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/navbar/navbar";
import Bienvenida from "./components/bienvenida/bienvenida";
import axios from "axios";
import Home from "./components/home/home";
import { addProduct, removeProduct } from "./globalFunctions/globalFunctions";
import Productos from "./components/tablaProductos/tablaproductos";
import Producto from "./components/productos/producto";
import Profile from "./components/user/user";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/loading/loading";
import { v4 as uuid } from "uuid";
import {
  serverTimestamp,
  setDoc,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import db from "../db/firebase-config";
import Carrito from "./components/carrito/carrito";

function App() {
  const [user, setUser] = useState([]);
  const [productos, setProductos] = useState([]);
  const [contador, setContador] = useState(0);
  const [add, setAdd] = useState(true);
  const [remove, setRemove] = useState(true);
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState({});

  // Code for populating database

  // const saveProductos = async (productos) => {
  //   for (let producto of productos) {
  //     let id = producto.id.toString();
  //     let docRef = doc(db, "products", id);
  //     producto = { ...producto, createdAt: serverTimestamp() };
  //     await setDoc(docRef, producto);
  //   }
  // };
  //   const saveUsers = async (users) => {
  //   for (let user of users) {
  //     let id = user.id.toString();
  //     let docRef = doc(db, "users", id);
  //     user = { ...user, createdAt: serverTimestamp() };
  //     await setDoc(docRef, user);
  //   }
  // };

  const getContador = async (user) => {
    const carritosCollection = collection(db, "carritos");
    let snapshot = await getDocs(carritosCollection);
    let carrito;
    for (let doc of snapshot.docs) {
      if (doc.data().user === user) {
        carrito = doc.data();
      }
    }
    let cantidad = carrito.products.length;
    setContador(cantidad);
  };
  
  const getUser = async () => {
    //API METHOD
    // let resp = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    // saveUsers(resp.data); //Populating database from API
    // setUser(resp.data[0]);
    const usersCollection = collection(db, "users");
    let snapshot = await getDocs(usersCollection);
    setUser(snapshot.docs[0].data());
    getCarrito(snapshot.docs[0].data().email);
    getContador(snapshot.docs[0].data().email);
  };

  const getProductos = async () => {
    const productsCollection = collection(db, "products");
    let snapshot = await getDocs(productsCollection);
    setProductos(snapshot.docs.map((doc) => doc.data()));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    //API METHOD
    // let resp = await axios.get(`https://dummyjson.com/products`);
    // // saveProductos(resp.data.products); Populating database from API
    // setProductos(resp.data.products);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
  };

  const getCarrito = async (user) => {
    const carritosCollection = collection(db, "carritos");
    let snapshot = await getDocs(carritosCollection);
    if (snapshot.docs.length === 0) {
      let id = uuid();
      let docRef = doc(db, "carritos", id);
      let carrito = { products: [],total:0, user: user, createdAt: serverTimestamp() };
      await setDoc(docRef, carrito);
      setCarrito(carrito);
    } else {
      let flag = false;
      for (let doc of snapshot.docs) {
        if (doc.data().user === user) {
          flag = true;
          setCarrito(doc.data());
        }
      }
      if (flag === false) {
        let id = uuid();
        let docRef = doc(db, "carritos", id);
        let carrito = {
          products: [],
          user: user,
          createdAt: serverTimestamp(),
        };
        await setDoc(docRef, carrito);
        setCarrito(carrito);
      }
    }
  };

  useEffect(() => {
    getUser();
    getProductos();
  }, []); //[] para que solo se ejecute una vez

  useEffect(() => {
    contador < 1 ? setContador(0) : setContador(removeProduct(contador));
  }, [remove]);

  useEffect(() => {
    setContador(addProduct(contador));
  }, [add]);

  return loading ? (
    <Loading />
  ) : (
    <div className="App">
      <div>
        <NavBar contador={contador} />
      </div>
      <div className="container">
        {" "}
        <Bienvenida usuario={user.name} username={user.username} />
        <a href="https://www.instagram.com/mobastudio.mx/" target="_blank">
          <img className="logo" src="/moba-studio.jpg" alt="MOBA logo" />
        </a>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/productos"
          element={
            <Productos
              productos={productos}
              setAdd={setAdd}
              add={add}
              user={user}
              setCarrito={setCarrito}
            />
          }
        />
        <Route
          path="/productos/:productoId"
          element={<Producto productos={productos} />}
        />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              setRemove={setRemove}
              remove={remove}
              user={user}
              setCarrito={setCarrito}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
