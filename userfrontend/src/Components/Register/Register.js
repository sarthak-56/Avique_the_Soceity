import React, { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    password2: '',
    tc: false,
  });

  const { email, name, password, password2, tc } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/user/register/', formData);
      console.log(res.data);
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className={styles.authContainer}> {/* Use the CSS module class */}
      <form onSubmit={handleSubmit} className={styles.authForm}> {/* Use the CSS module class */}
        <h3>Create your account</h3>
        <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required className={styles.input} /> {/* Use the CSS module class */}
        <input type="text" name="name" value={name} onChange={handleChange} placeholder="Name" required className={styles.input} /> {/* Use the CSS module class */}
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" required className={styles.input} /> {/* Use the CSS module class */}
        <input type="password" name="password2" value={password2} onChange={handleChange} placeholder="Confirm Password" required className={styles.input} /> {/* Use the CSS module class */}
        <label className={styles.label}>
          <input
            type="checkbox"
            name="tc"
            checked={tc}
            className={styles.checkbox}
            onChange={handleChange}
            required
          />
          <span className={styles.checkboxText}>I agree to the terms and conditions</span>
        </label>

        <button type="submit" className={styles.button}>Register</button> {/* Use the CSS module class */}
        <p onClick={handleLoginRedirect} className={styles.link}>I have an account</p> {/* Use the CSS module class */}
      </form>
    </div>
  );
};

export default Register;
