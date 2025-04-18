import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';

const StudentProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        givenQuizzes: 0,
        enrolledCourses: 0,
        progress: 0, // Progress in percentage
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/students/profile'); // Fetch student profile
                console.log('Profile data:', response.data); // Debug profile data
                setProfile(response.data);
                console.log('Updated profile state:', response.data); // Debug updated profile state
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="profile-container">
            <div className="profile-box">
                <h1 className="profile-title">Student Profile</h1>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Quizzes Given:</strong> {profile.givenQuizzes}</p>
                <p><strong>Enrolled Courses:</strong> {profile.enrolledCourses}</p>
                <p><strong>Progress:</strong> {profile.progress}%</p>
            </div>

            <style>{`
            * { margin: 0; padding: 0; box-sizing: border-box; }
                .profile-container {
                    min-height: 100vh;
                    background: linear-gradient(to right, #6a11cb, #2575fc);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .profile-box {
                    background-color: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    max-width: 500px;
                    width: 100%;
                    text-align: center;
                }

                .profile-title {
                    font-size: 26px;
                    color: #333;
                    margin-bottom: 20px;
                }

                p {
                    font-size: 16px;
                    color: #555;
                    margin: 10px 0;
                }

                strong {
                    color: #333;
                }
            `}</style>
        </div>
    );
};

export default StudentProfile;
