import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';

const AddStudyMaterial = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);

        try {
            await axiosInstance.post('/study-materials', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Study material added successfully!');
            setTitle('');
            setFile(null);
            setError(null);
        } catch (error) {
            console.error('Error adding study material:', error);
            setError('Failed to add study material. Please try again.');
        }
    };

    return (
        <div className="material-container">
            <div className="material-box">
                <h1 className="material-title">Add Study Material</h1>
                <form onSubmit={handleSubmit} className="material-form">
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Upload PDF:
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            required
                        />
                    </label>

                    <button type="submit">Add Material</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    padding: 0;
                }

                .material-container {
                    min-height: 100vh;
                    background: linear-gradient(to right, #43cea2, #185a9d);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .material-box {
                    background-color: #fff;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    max-width: 500px;
                    width: 100%;
                }

                .material-title {
                    font-size: 24px;
                    text-align: center;
                    margin-bottom: 20px;
                    color: #222;
                }

                .material-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .material-form label {
                    display: flex;
                    flex-direction: column;
                    font-size: 14px;
                    color: #444;
                }

                .material-form input[type="text"],
                .material-form input[type="file"] {
                    margin-top: 8px;
                    font-size: 14px;
                }

                .material-form button {
                    background-color: #43cea2;
                    color: white;
                    padding: 12px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s ease;
                }

                .material-form button:hover {
                    background-color: #36a98c;
                }

                .error {
                    color: red;
                    text-align: center;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
};

export default AddStudyMaterial;
