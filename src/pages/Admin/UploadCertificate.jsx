import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyALER6J04enZVziVENWW1bOn7lhJs3uiII",
    authDomain: "portfolio-cc0d2.firebaseapp.com",
    projectId: "portfolio-cc0d2",
    storageBucket: "portfolio-cc0d2.appspot.com",
    messagingSenderId: "850678827478",
    appId: "1:850678827478:web:aa80f06fc68c9610433c77",
    measurementId: "G-SX374W09KN"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const UploadCertificate = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleUpload = async () => {
        try {
            if (!image || !title || !description) {
                console.error("All fields are required");
                return;
            }

            const storageRef = ref(storage, `certificates/${image.name}`);
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);

            // Send data to backend
            await fetch('https://manikandan05-backend.vercel.app/api/uploadCertificate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl: url,
                }),
            });

            console.log("Image uploaded and data sent to backend successfully.");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Upload Certificate</h2>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4" />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4" />
            <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                Upload Image
            </button>
            {imageUrl && <img src={imageUrl} alt="Uploaded Certificate" className="mt-4 rounded-lg" />}
        </div>
    );
};

export default UploadCertificate;