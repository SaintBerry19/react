import db from "../../db/firebase-config";
import {
  serverTimestamp,
  setDoc,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

const addProduct = (contador, cantidad) => {
  if (contador < 1) {
    contador = 0;
  }

  contador += Number(cantidad);
  return contador;
};
const removeProduct = (contador, cantidad) => {
  contador -= Number(cantidad);
  if (contador < 1) {
    contador = 0;
  }
  return contador;
};

const saveProductos = async (producto, user, cantidad) => {
  const carritosCollection = collection(db, "carritos");
  let snapshot = await getDocs(carritosCollection);
  let id;
  let carrito;
  for (let doc of snapshot.docs) {
    if (doc.data().user === user.email) {
      id = doc.id;
      carrito = doc.data();
    }
  }
  let flag = false;
  if (carrito.products.length > 0) {
    for (let product of carrito.products) {
      if (product.id === producto.id) {
        product.cantidad = product.cantidad + Number(cantidad);
        product.subtotal = product.cantidad * product.price;
        carrito.total = carrito.total + product.subtotal;
        flag = true;
      }
    }
    if (flag === false) {
      producto.cantidad = Number(cantidad);
      producto.subtotal = producto.cantidad * producto.price;
      carrito.total = carrito.total + producto.subtotal;
      carrito.products.push(producto);
    }
  } else {
    producto.cantidad = Number(cantidad);
    producto.subtotal = producto.cantidad * producto.price;
    carrito.total = carrito.total + producto.subtotal;
    carrito.products.push(producto);
  }
  let docRef = doc(db, "carritos", id);
  await setDoc(docRef, carrito);
  return carrito;
};

const deleteProductos = async (producto, user, cantidad) => {
  const carritosCollection = collection(db, "carritos");
  let snapshot = await getDocs(carritosCollection);
  let id;
  let carrito;
  for (let doc of snapshot.docs) {
    if (doc.data().user === user.email) {
      id = doc.id;
      carrito = doc.data();
    }
  }
  let docRef = doc(db, "carritos", id);
  let index;
  for (let i = 0; i < carrito.products.length; i++) {
    if (carrito.products[i].id === producto.id) {
      index = i;
      if (carrito.products[i].cantidad <= Number(cantidad)) {
        carrito.total =
          carrito.total -
          carrito.products[i].cantidad * carrito.products[i].price;
        carrito.products.splice(index, 1);
      } else {
        carrito.products[i].cantidad =
          carrito.products[i].cantidad - Number(cantidad);
        carrito.products[i].subtotal =
          carrito.products[i].cantidad * carrito.products[i].price;
        carrito.total =
          carrito.total - Number(cantidad) * carrito.products[i].price;
      }
    }
  }
  await setDoc(docRef, carrito);
  return carrito;
};

const realizarCompra = async (user) => {
  const carritosCollection = collection(db, "carritos");
  let snapshot = await getDocs(carritosCollection);
  let id;
  let carrito;
  for (let doc of snapshot.docs) {
    if (doc.data().user === user.email) {
      id = doc.id;
      carrito = doc.data();
    }
  }    
  let sumaProductos = 0
  for (let producto of carrito.products) {
    sumaProductos=sumaProductos+ producto.cantidad
  }
  let orderId = uuid();
  let orderRef = doc(db, "orders", orderId);
  let order = {
    numeroProductos:sumaProductos,
    id:orderId,
    products: carrito.products,
    total: carrito.total,
    user: user.email,
    createdAt: serverTimestamp(),
  };
  await setDoc(orderRef, order);
  carrito.products = [];
  carrito.total = 0;
  let docRef = doc(db, "carritos", id);
  await setDoc(docRef, carrito);

  return carrito;
};
export {
  addProduct,
  removeProduct,
  saveProductos,
  deleteProductos,
  realizarCompra,
};
