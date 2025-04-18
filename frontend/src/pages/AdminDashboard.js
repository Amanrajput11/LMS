import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig'; // Updated path

function AdminDashboard() {
    const [courseCount, setCourseCount] = useState(0);
    const [studyMaterialCount, setStudyMaterialCount] = useState(0);
    const [quizCount, setQuizCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const courseResponse = await axiosInstance.get('/courses/count');
                console.log('Course count response:', courseResponse.data); // Debug course count
                setCourseCount(courseResponse.data.count);

                const studyMaterialResponse = await axiosInstance.get('/study-materials/count');
                console.log('Study material count response:', studyMaterialResponse.data); // Debug study material count
                setStudyMaterialCount(studyMaterialResponse.data.count);

                const quizResponse = await axiosInstance.get('/quizzes/count');
                console.log('Quiz count response:', quizResponse.data); // Debug quiz count
                setQuizCount(quizResponse.data.count);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="admin-wrapper">
            <div className="sidebar">
                <h2 className="sidebar-title">Admin Panel</h2>
                <ul className="nav-links">
                    <li><Link to="/admin/add-course">➕ Add Course</Link></li>
                    <li><Link to="/admin/add-study-material">📚 Add Study Material</Link></li>
                    <li><Link to="/admin/add-quiz">📝 Add Quiz</Link></li>
                </ul>
            </div>

            <div className="main-content">
                <div className="dashboard">
                    <h1>Welcome, Admin 👋</h1>
                    <p className="subtitle">Here’s a quick overview of your platform.</p>
                    <div className="cards">
                        <div className="card">
                            <h2>📊 {courseCount} Courses</h2>
                            <p>Manage, update, or add new courses.</p>
                            <Link to="/admin/add-course">Add New</Link>
                        </div>
                        <div className="card">
                            <h2>📁 {studyMaterialCount} Study Materials</h2>
                            <p>PDFs and learning documents.</p>
                            <Link to="/admin/add-study-material">Upload</Link>
                        </div>
                        <div className="card">
                            <h2>❓ {quizCount} Quizzes</h2>
                            <p>Assess students with interactive quizzes.</p>
                            <Link to="/admin/add-quiz">Create Quiz</Link>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .admin-wrapper {
                    display: flex;
                    height: 100vh;
                    width: 100vw;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .sidebar {
                    width: 250px;
                    background: #2c3e50;
                    color: white;
                    padding: 30px 20px;
                }

                .sidebar-title {
                    font-size: 24px;
                    margin-bottom: 30px;
                }

                .nav-links {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 35px;
                }

                .nav-links li a {
                    color: white;
                    text-decoration: none;
                    font-size: 16px;
                    padding: 10px 15px;
                    background: #34495e;
                    border-radius: 8px;
                    transition: 0.3s;
                }

                .nav-links li a:hover {
                    background: #1abc9c;
                }

                .main-content {
                    flex: 1;
                    background: linear-gradient(to right, #fdfbfb, #ebedee);
                    padding: 40px 60px;
                    overflow-y: auto;
                }

                .dashboard h1 {
                    font-size: 32px;
                    margin-bottom: 10px;
                    color: #2c3e50;
                }

                .subtitle {
                    font-size: 18px;
                    color: #777;
                    margin-bottom: 30px;
                }

                .cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                }

                .card {
                    background: white;
                    border-radius: 16px;
                    padding: 30px 20px;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                    text-align: center;
                    transition: transform 0.3s ease;
                }

                .card:hover {
                    transform: translateY(-5px);
                }

                .card h2 {
                    font-size: 22px;
                    margin-bottom: 10px;
                    color: #2c3e50;
                }

                .card p {
                    font-size: 14px;
                    color: #555;
                    margin-bottom: 15px;
                }

                .card a {
                    display: inline-block;
                    background: #1abc9c;
                    color: white;
                    padding: 8px 14px;
                    border-radius: 6px;
                    text-decoration: none;
                    font-size: 14px;
                    transition: background 0.3s;
                }

                .card a:hover {
                    background: #16a085;
                }
            `}</style>
        </div>
    );
}

export default AdminDashboard;
