import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userServices from '../services/userServices';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const location = e.target.location.value;

    userServices.register({ email, password, name, location })
      .then(response => {
        e.target.reset();

        if (response.status === 201) {
          alert('Registration successful');
          navigate('/');
        } else {
          alert('Registration failed');
        }
      })
      .catch(error => {
        alert('Registration failed');
        console.error(error);
      });
  };

  return (
    <div className='container'>
      <form onSubmit={handleRegister} className='border p-3'>
        <div className='mb-3'>
          <input type="text" name="name" placeholder='Name' required className='form-control' />
        </div>
        <div className='mb-3'>
          <input type="email" name="email" placeholder='Email' required className='form-control' />
        </div>
        <div className='mb-3'>
          <input type="password" name="password" placeholder='Password' required className='form-control' />
        </div>
        <div className='mb-3'>
          <input type="text" name="location" placeholder='Location' required className='form-control' />
        </div>
        <button type='submit' className='btn btn-primary'>Register</button>
        <p>Already have an account? <Link to='/'>Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
