import React from 'react'
import {Routes,Route} from 'react-router-dom'
import DetallesUsuarios from '../pages/DetallesUsuarios'
import Home from '../pages/Home'

export default function Rutas() {
  return (
    <div>

<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/usuarios' element={<DetallesUsuarios/>}/>




</Routes>


    </div>
  )
}
