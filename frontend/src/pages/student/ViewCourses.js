import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';

const ViewCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.get('/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="course-container">
            <h1 className="course-title">Available Courses</h1>
            {courses.length > 0 ? (
                <ul className="course-list">
                    {courses.map((course) => (
                        <li key={course._id} className="course-card">
                            <h2>{course.courseName}</h2>
                            <p>{course.description}</p>
                            <a
                                href={`http://localhost:5000/${course.videoPath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="course-link"
                            >
                                ▶ Play Video
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-courses">No courses available.</p>
            )}

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: #f4f7fa;
                }

                .course-container {
                    padding: 40px;
                    max-width: 900px;
                    margin: 0 auto;
                }

                .course-title {
                    font-size: 32px;
                    text-align: center;
                    margin-bottom: 40px;
                    color: #333;
                }

                .course-list {
                    list-style: none;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 24px;
                }

                .course-card {
                    background: #fff;
                    border-radius: 12px;
                    padding: 20px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    transition: transform 0.2s;
                }

                .course-card:hover {
                    transform: translateY(-4px);
                }

                .course-card h2 {
                    color: #2c3e50;
                    margin-bottom: 12px;
                    font-size: 22px;
                }

                .course-card p {
                    color: #555;
                    margin-bottom: 16px;
                }

                .course-link {
                    text-decoration: none;
                    background-color: #2575fc;
                    color: #fff;
                    padding: 10px 16px;
                    border-radius: 6px;
                    font-weight: bold;
                    display: inline-block;
                    transition: background 0.3s ease;
                }

                .course-link:hover {
                    background-color: #1e60d8;
                }

                .no-courses {
                    text-align: center;
                    font-size: 18px;
                    color: #e74c3c;
                }
            `}</style>
        </div>
    );
};

export default ViewCourses;
