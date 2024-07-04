import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import FriendList from './Components/FriendList/FriendList';
import FriendRequestList from './Components/FriendRequest/FriendRequestList';
import UserSearch from './Components/Search/UserSearch';
import CreatePost from './Components/CreatePost/CreatePost';
import FeedPage from './Components/FeedPage/FeedPage';
import UserPostsPage from './Components/UserPostsPage/UserPostsPage';
import ProfileEdit from './Components/Profile/ProfileEdit'
import Main from './Components/Main/Main'
import SavedPost from './Components/SavedPost/SavedPost';
import './index.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/profile" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/main" element={<PrivateRoute element={<Main />} />} />
        <Route path="/friends" element={<PrivateRoute element={<FriendList />} />} />
        <Route path="/friends-request" element={<PrivateRoute element={<FriendRequestList />} />} />
        <Route path="/search" element={<PrivateRoute element={<UserSearch />} />} />
        <Route path="/userposts" element={<PrivateRoute element={<CreatePost />} />} />
        <Route path="/userpostsfeed" element={<PrivateRoute element={<FeedPage />} />} />
        <Route path="/user-posts" element={<PrivateRoute element={<UserPostsPage />} />} />
        <Route path="/editprofile" element={<PrivateRoute element={<ProfileEdit />} />} />
        <Route path="/save" element={<PrivateRoute element={<SavedPost/>} />} />
        <Route path="/profile/:id" element={<Profile/>} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
