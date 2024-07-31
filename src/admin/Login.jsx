import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_USER } from '../constants';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user || (username === ADMIN_USER.username && password === ADMIN_USER.password)) {
      localStorage.setItem('currentUser', JSON.stringify({ username }));
      if (username === ADMIN_USER.username) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
