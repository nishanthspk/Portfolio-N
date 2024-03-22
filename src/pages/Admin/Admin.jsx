import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication status from local storage
    localStorage.removeItem('authenticated');
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-between"  style={{backgroundColor:'#FF4900'}}>
        <h2 className="text-3xl font-semibold mb-4 pt-4 px-3">Dashboard</h2>
      <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mx-4 my-5 px-4 py-2 rounded-lg shadow-md"
          onClick={handleLogout}
          >
          Logout
        </button>
          </div>
      <div className="grid grid-cols-1 mx-5 my-10 md:grid-cols-6 md:mx-2 gap-6">
        <Link to="/admin/uploadproject" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-4 rounded-lg shadow-md block text-center">
          Upload Project
        </Link>
        <Link to="/admin/uploadcertificate" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-4 rounded-lg shadow-md block text-center">
          Upload Certificate
        </Link>
        <Link to="/admin/uploadcertificate" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-4 rounded-lg shadow-md block text-center">
          Upload Testimonials
        </Link>
      </div>
    </div>
  );
};

export default Admin;