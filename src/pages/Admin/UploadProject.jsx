import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALER6J04enZVziVENWW1bOn7lhJs3uiII",
  authDomain: "portfolio-cc0d2.firebaseapp.com",
  projectId: "portfolio-cc0d2",
  storageBucket: "portfolio-cc0d2.appspot.com",
  messagingSenderId: "850678827478",
  appId: "1:850678827478:web:aa80f06fc68c9610433c77",
  measurementId: "G-SX374W09KN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const UploadProject = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [deployment, setDeployment] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    try {
      setError('');
      if (!image || !title || !description || !githubLink) {
        throw new Error("All fields are required");
      }

      setUploading(true);

      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      console.log("Image uploaded successfully. URL:", imageUrl);

      const response = await fetch('https:///api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          githubLink,
          imageUrl,
          deployment
        })
      });

      if (!response.ok) {
        throw new Error('Failed to upload data to server');
      }

      console.log("Data sent to backend successfully.");
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4" />
      <input type="text" placeholder="GitHub Link" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4" />
      <input type="text" placeholder="Deployment Link (Optional)" value={deployment} onChange={(e) => setDeployment(e.target.value)} className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4" />
      <button onClick={handleUpload} disabled={uploading} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mt-4">
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default UploadProject;