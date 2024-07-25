import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userServices from '../services/userServices';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await userServices.login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <div className="mb-3">
          <input type="password" name="password" placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
