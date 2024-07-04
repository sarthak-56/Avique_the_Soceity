import React, { useState } from 'react';
import { sendPasswordResetEmail } from './api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPasswordResetEmail(email);
      setMessage(response.data.msg);
    } catch (error) {
      setMessage('Failed to send password reset email');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">Send Password Reset Email</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ForgotPassword;
