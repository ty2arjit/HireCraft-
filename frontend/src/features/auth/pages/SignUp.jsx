import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../auth.form.scss'


const SignUp = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventdefault();
    
  }
  return (
    <main>
      <div className="form-container">
        <h1 className="auth-heading">Sign Up</h1>

        <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label htmlFor='username'>Username</label>
          <input type="username" id="username" name="username" placeholder="Enter Username"></input>
        </div>

        <div className="input-group">
          <label htmlFor='email'>Email</label>
          <input type="email" id="email" name="email" placeholder="Enter Email address"></input>
        </div>

        <div className="input-group password">
          <label htmlFor='password'>Password</label>
          <input type="password" id="password" name="password" placeholder="Enter Password "></input>
        </div>

        <button className='button primary-button'>SignUp</button>

        </form>

        <p className="login-signup-toggle">Already have an account? <Link to={"/login"} className="login-signup-toggle-link">Login</Link></p>
      </div>
    </main>
  )
}

export default SignUp
