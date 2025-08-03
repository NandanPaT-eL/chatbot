import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Internship from './pages/Internship';
import Projects from './pages/Project';
import Partners from './pages/Partners';
import Team from './pages/Team';
import AdminIntern from './pages/AdminIntern';
import Login from './pages/Login';
import ProtectedRoute from '../src/components/ProtectedRoute.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/internship' element={<Internship />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/partners' element={<Partners />} />
        <Route path='/team' element={<Team />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/admin'
          element={
            <ProtectedRoute>
              <AdminIntern />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;