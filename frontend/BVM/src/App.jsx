import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Internship from './pages/Internship'
import Projects from './pages/Project'
import Partners from './pages/Partners'
import Team from './pages/Team'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/internship' element={<Internship />}/>
        <Route path='/projects' element={<Projects />}/>
        <Route path='/partners' element={<Partners />}/>
        <Route path='/team' element={<Team />}/>
      </Routes>
    </div>
  )
}

export default App