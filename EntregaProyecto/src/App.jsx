import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import NavBar from './components/navbar/navbar'
import Bienvenida from './components/bienvenida/bienvenida'

function App() {
  const user='Profesor del Curso de React!'
  return (
      <div className="App">
        <div><NavBar/></div>
      <div className="container">
        <a href="https://www.instagram.com/mobastudio.mx/" target="_blank">
          <img class="img-responsive" src="/moba-studio.jpg" width='300px' className="logo" alt="MOBA logo" />
        </a>
        <Bienvenida usuario={user}/>
      </div>
    </div>
  )
}

export default App
