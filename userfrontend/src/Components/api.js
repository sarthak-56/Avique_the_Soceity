import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/user';  

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register/`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${API_URL}/login/`, userData);
};

export const getUserProfile = (token) => {
  return axios.get(`${API_URL}/profile/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const changePassword = (token, passwordData) => {
  return axios.post(`${API_URL}/change-password/`, passwordData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const sendPasswordResetEmail = (email) => {
  return axios.post(`${API_URL}/send-reset-password-email/`, { email });
};

export const resetPassword = (uid, token, passwordData) => {
  return axios.post(`${API_URL}/reset/${uid}/${token}/`, passwordData);
};


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/user/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  
  const response = await api.post('userposts/', postData, config);
  return response.data;
};

export const likePost = (postId) => {
  return axios.post(`${API_URL}/userposts/${postId}/likes/`);
};







export const fetchComments = () => api.get('/comments/');
export const createComment = (data) => api.post('/comments/', data);

export const fetchShares = () => api.get('/shares/');
export const createShare = (data) => api.post('/shares/', data);