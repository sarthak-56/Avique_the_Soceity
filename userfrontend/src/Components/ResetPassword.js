import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ password: '', password_confirm: '' });
  const [message, setMessage] = useState('');
  const { uid, token } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirm) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`/api/user/reset-password/${uid}/${token}/`, formData);
      setMessage(response.data.msg);
    } catch (error) {
      setMessage('Password reset failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="New Password"
        required
      />
      <input
        type="password"
        name="password_confirm"
        value={formData.password_confirm}
        onChange={handleChange}
        placeholder="Confirm New Password"
        required
      />
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ResetPassword;
