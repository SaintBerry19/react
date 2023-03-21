import db from "../../db/firebase-config";
import {
  serverTimestamp,
  setDoc,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";

const addProduct = (contador) => {
  contador += 1;
  return contador;
};
const removeProduct = (contador) => {
  contador -= 1;
  return contador;
};

const saveProductos = async (producto, user) => {
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
  carrito.products.push(producto);
  await setDoc(docRef, carrito);
  return carrito;
};

const deleteProductos = async (producto, user,refresh) => {
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
      break;
    }
  }
  carrito.products.splice(index, 1); // 2nd parameter means remove one item only
  await setDoc(docRef, carrito);
  return carrito;
};

export { addProduct, removeProduct, saveProductos, deleteProductos };
