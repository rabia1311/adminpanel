import React from 'react'
import "../Adminlogin/login.css"
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    
    navigate('/home');
  };
  return (
    <div className='cover'><h1> Admin Panel Login</h1>

    <input type='text'placeholder='email'/>
   
    <input type='password'placeholder='password'/>
    <button className="login" onClick={handleLogin}>LOG IN HERE</button>

    
    </div>
  )
}

export default Login;