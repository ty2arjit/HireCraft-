import React from 'react'
import '../auth.form.scss'
import { useNavigate, Link } from 'react-router-dom'
const Login = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventdefault();
    
  }
  return (
    <main>
      <div className="form-container">
        <h1 className="auth-heading">Login</h1>

        <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label htmlFor='email'>Email</label>
          <input type="email" id="email" name="email" placeholder="Enter Email address"></input>
        </div>

        <div className="input-group password">
          <label htmlFor='password'>Password</label>
          <input type="password" id="password" name="password" placeholder="Enter Password "></input>
        </div>

        <button className='button primary-button'>Login</button>

        </form>


        <p className="login-signup-toggle">New here? <Link to={"/signup"} className="login-signup-toggle-link">Create Account</Link></p>
      </div>
    </main>
  )
}

export default Login
