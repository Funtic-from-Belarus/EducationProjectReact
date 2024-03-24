import React, { useEffect, useState } from 'react'
// { useEffect, useMemo, useRef, useState }
// import Counter from './components/Counter'
// import ClassCounter from './components/ClassCounter';
import './styles/App.css'
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import About from './pages/About';
import Posts from './pages/Posts';
import Error from './pages/Error';
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';

function App() {

  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setLoading] = useState(true)


  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={
      {
        isAuth,
        setIsAuth,
        isLoading
      }
    }>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
