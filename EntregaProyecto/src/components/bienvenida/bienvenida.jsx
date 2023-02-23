import "./bienvenida.css"
function Bienvenida(props) {
  return (
    <div><h1 className="texto">Bienvenido {props.usuario}</h1></div>
  )
}
export default Bienvenida