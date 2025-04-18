import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    return (
        <div className="student-dashboard-container">
            <div className="student-dashboard-box">
                <h1 className="student-dashboard-title">Student Dashboard</h1>
                <p className="student-dashboard-subtitle">Welcome to your dashboard. Choose an option below:</p>
                <ul className="student-dashboard-links">
                    <li><Link to="/student/profile">👤 View Profile</Link></li>
                    <li><Link to="/student/give-quiz">📝 Give Quiz</Link></li>
                    <li><Link to="/student/view-courses">📘 View Courses</Link></li>
                    <li><Link to="/student/view-study-materials">📚 View Study Materials</Link></li>
                </ul>
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

                .student-dashboard-container {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(to right, #74ebd5, #ACB6E5);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .student-dashboard-box {
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    width: 100%;
                    max-width: 500px;
                    text-align: center;
                }

                .student-dashboard-title {
                    font-size: 28px;
                    color: #333;
                    margin-bottom: 10px;
                }

                .student-dashboard-subtitle {
                    font-size: 16px;
                    color: #666;
                    margin-bottom: 25px;
                }

                .student-dashboard-links {
                    list-style: none;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .student-dashboard-links li a {
                    text-decoration: none;
                    background-color: #4da0b0;
                    color: white;
                    padding: 12px;
                    border-radius: 8px;
                    font-size: 16px;
                    display: inline-block;
                    transition: background-color 0.3s;
                }

                .student-dashboard-links li a:hover {
                    background-color: #3c8c9e;
                }
            `}</style>
        </div>
    );
};

export default StudentDashboard;
