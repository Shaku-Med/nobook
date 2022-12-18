import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Filter from './Components/Filter'
import Friends from './Components/Friends'
import Groups from './Components/Groups'
import Home from './Components/Home'
import Profile from './Components/Profile'
import Watch from './Components/Watch'

function Routing() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Friends' element={<Friends/>} />
        <Route path='/Watch' element={<Watch/>} />
        <Route path='/Groups' element={<Groups/>} />
        <Route path='/Profile/:id' element={<Profile/>}>
            <Route path=':filter' element={<Filter/>}/>
        </Route>
    </Routes>
  )
}

export default Routing