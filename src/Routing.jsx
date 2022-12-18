import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Friends from './Components/Friends'
import Groups from './Components/Groups'
import Home from './Components/Home'
import Watch from './Components/Watch'

function Routing() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Friends' element={<Friends/>} />
        <Route path='/Watch' element={<Watch/>} />
        <Route path='/Groups' element={<Groups/>} />
    </Routes>
  )
}

export default Routing