import React, { useContext } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';

const Navbar = () => {
   const { isAuth, setIsAuth } = useContext(AuthContext)
   const exit = () => {
      setIsAuth(false);
      localStorage.removeItem('auth')
   }
   return (
      <div className='navbar'>
         <MyButton onClick={exit}>exit</MyButton>
         <div className='navbar__links'>
            <Link to='/about'>About</Link>
            <Link to='/posts'>Posts</Link>
         </div>
      </div>
   )
}

export default Navbar
