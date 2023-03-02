import "../../App.css"
import { Link } from "react-router-dom"
function Home() {
  return (
    <div>        
      <Link to={`/productos`}>
        <img className="homeimg" src="/1.jpg" alt="MOBA logo" />
        <img className="homeimg" src="/6.jpg" alt="MOBA logo" />
        <img className="homeimg" src="/5.jpg" alt="MOBA logo" />
        <img className="homeimg" src="/7.jpg" alt="MOBA logo" />
        <img className="homeimg" src="/8.jpg" alt="MOBA logo" />
        <img className="homeimg" src="/9.jpg" alt="MOBA logo" />
        </Link>
    </div>
  )
}

export default Home