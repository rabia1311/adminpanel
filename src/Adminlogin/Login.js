import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Adminlogin/login.css"
import { Link,useNavigate } from 'react-router-dom';
const Login = () => {
    const [credentials, setCredentials] = useState({  email: "", password: ""});
    let navigate=useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:3000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  email: credentials.email, password: credentials.password})
      });
  
      const json =  await response.json();
      console.log(json);
      if (!json.success) {
        toast.error("Enter valid credentials");
      }

      if(json.success){
        toast.success("Login Successfully");
        navigate("/home");
        
      }
    };
  
    const onChange = (event) => {
      setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };
  
  return (
    <>
    <div className="container">
      
      <div className="form-wrapper">
      <h2 className="signup-heading"> LOG IN  HERE</h2>
        <form onSubmit={handleSubmit}>
         
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
          </div>
         

          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/signup" className='m-3 btn btn-danger'> I am a new  User</Link>
        </form>
        <ToastContainer/>
      </div>
    </div>
    </>
  )
}

export default Login