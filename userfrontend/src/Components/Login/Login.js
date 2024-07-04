import React, { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';
import  styles from './Login.module.css'

const Login = ({ setAuth }) => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginRedirect = () => {
    navigate('/register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.data.token.access);
      setAuth(true);
      navigate('/main');
    } catch (error) {
      setMessage('Login failed: Incorrect email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['auth-container']}>
      <form onSubmit={handleSubmit} className={styles['auth-form']}>
        <h3>Login into your account</h3>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {message && <div className={styles.alert}>{message}</div>}
        <p onClick={handleLoginRedirect}>I have not an account</p>
      </form>
    </div>

  );
};

export default Login;
