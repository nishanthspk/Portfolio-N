import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [admin, setAdmin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminChange = (e) => {
    setAdmin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://manikandan05-backend.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ admin, password })
      });
      const data = await response.json();
  
      if (response.ok) {
        console.log(data.message);
        window.localStorage.setItem('authenticated', true);
        window.location.href='./admin'
      } else {
        alert('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center font-bold">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="admin" className="block text-gray-700">Admin:</label>
            <input
              type="text"
              id="admin"
              value={admin}
              onChange={handleAdminChange}
              className="form-input border-2 rounded border-gray-400 mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-input border-2 rounded border-gray-400  mt-1 block w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Auth;