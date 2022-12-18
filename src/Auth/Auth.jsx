import React from 'react'
import { Routes, Route, BrowserHistory } from 'react-router-dom'
import Login from './Login'
import Reset from './Reset'
import Signup from './Signup'

function Auth() {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Reset/Account' element={<Reset/>}/>
    </Routes>
  )
}

export default Auth