import { Link, useParams } from "react-router-dom";

function User(props) {
    let { userId } = useParams();
    userId = Number(userId);
    let users = props.users;
    let selectedUser = [];
    for (let user of users) {
      if (user.id === userId) {
        selectedUser.push(user);
      }
    }
    let displayUser = selectedUser[0];
    return displayUser ? (
    <div>
      <h2>Nombre:{displayUser.name}</h2>
      <h3>Usuario:{displayUser.username}</h3>
      <h3>Email:{displayUser.email}</h3>
      <h3>Telefono:{displayUser.phone}</h3>
      <Link to={'/'}><h2>Gallery</h2></Link>
      <Link to={'/productos'}><h2>Lista de Productos</h2></Link>
    </div>

    ) : (
      <h1>El usuario que buscas no ha sido encontrado!</h1>
    );
  }
  export default User;
  