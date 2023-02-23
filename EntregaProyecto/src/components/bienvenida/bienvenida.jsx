import "./bienvenida.css"
function Bienvenida(props) {
  return (
    <div><h2 className="texto">Bienvenido {props.usuario} MEJOR CONOCIDO COMO: {props.username}</h2></div>
  )
}
export default Bienvenida