import React, { useContext } from 'react'
import MyInput from '../components/UI/input/MyInput'
import MyButton from '../components/UI/button/MyButton'
import { AuthContext } from '../context'

const Login = () => {

   const { isAuth, setIsAuth } = useContext(AuthContext);
   const login = event => {
      event.preventDefault();
      setIsAuth(true)
      localStorage.setItem('auth', 'true')
   }

   return (
      <div>
         <h1>The page to authorization</h1>
         <form onSubmit={login}>
            <MyInput type='text' placeholder='enter login' />
            <MyInput type='password' placeholder='enter password' />
            <MyButton >submit</MyButton>
         </form>
      </div>
   )
}

export default Login
