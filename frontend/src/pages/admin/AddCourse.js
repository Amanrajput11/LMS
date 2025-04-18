import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig'; // Updated path

const AddCourse = () => {
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);

    const handleVideoChange = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!video) {
            alert('Please upload a video.');
            return;
        }

        const formData = new FormData();
        formData.append('courseName', courseName);
        formData.append('description', description);
        formData.append('video', video);

        console.log('Form data:', courseName, description, video);

        try {
            await axiosInstance.post('/courses', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Course added successfully!');
            setCourseName('');
            setDescription('');
            setVideo(null);
        } catch (error) {
            console.error('Error adding course:', error);
            alert('Failed to add course.');
        }
    };

    return (
        <div className="add-course-container">
            <div className="add-course-box">
                <h1 className="add-course-title">Add New Course</h1>
                <form onSubmit={handleSubmit} className="add-course-form">
                    <label>
                        Course Name:
                        <input
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Upload Video:
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            required
                        />
                    </label>

                    <button type="submit">Add Course</button>
                </form>
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

                .add-course-container {
                    min-height: 100vh;
                    background: linear-gradient(to right, #667eea, #764ba2);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .add-course-box {
                    background-color: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    max-width: 500px;
                    width: 100%;
                }

                .add-course-title {
                    font-size: 26px;
                    color: #333;
                    text-align: center;
                    margin-bottom: 20px;
                }

                .add-course-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .add-course-form label {
                    display: flex;
                    flex-direction: column;
                    font-size: 14px;
                    color: #444;
                }

                .add-course-form input[type="text"],
                .add-course-form textarea,
                .add-course-form input[type="file"] {
                    margin-top: 8px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-size: 14px;
                }

                .add-course-form textarea {
                    resize: vertical;
                    min-height: 80px;
                }

                .add-course-form button {
                    background-color: #667eea;
                    color: white;
                    padding: 12px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s ease;
                }

                .add-course-form button:hover {
                    background-color: #556cd6;
                }
            `}</style>
        </div>
    );
};

export default AddCourse;
