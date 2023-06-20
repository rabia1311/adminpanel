import React from 'react'
import "../Adminlogin/login.css"
const Login = () => {
  return (
    <div className='cover'><h1> Admin Panel Login</h1>

    <input type='text'placeholder='username'/>
    <input type='password'placeholder='Key '/>
    <input type='password'placeholder='password'/>
    <button className="login">Log in here</button>

    
    </div>
  )
}

export default Login