import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; // Import the CSS module

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/logo.gif" alt="Logo"/>
      </div>
      <h4>Welcome to our registration page! Registering with us allows you to access exclusive features and content.</h4>
      <Link to="/register">Create your account</Link>
    
      <h4>Welcome back! Please log in to access your account. If you don't have an account yet, you can register here.</h4>
      <Link to="/login">Login to your account</Link>
    </div>
  );
};

export default Home;
