import React from 'react'
import "../Adminlogin/login.css"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    
    navigate('/admin/dashboard');
  };
  return (
    <div className='cover'><h1> Admin Panel Login</h1>

    <input type='text'placeholder='username'/>
    <input type='password'placeholder='Key '/>
    <input type='password'placeholder='password'/>
    <button className="login" onClick={handleLogin}>LOG IN HERE</button>

    
    </div>
  )
}

export default Login;