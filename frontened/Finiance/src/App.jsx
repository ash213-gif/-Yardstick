import React from 'react'
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Content/Dashboard'
import Budget from './components/Content/Budget'
import Tranaction from './components/Content/Tranaction'


export default function App() {
  return (
    <>

      <BrowserRouter>
      <Home />
        <Routes>
          <Route path='/' element={ <Dashboard/>} />
          <Route path='/transaction' element={ <Tranaction/>} />
          <Route path='/budget' element={ <Budget/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
