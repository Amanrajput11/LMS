import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';

const ViewStudyMaterials = () => {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await axiosInstance.get('/study-materials');
                setMaterials(response.data);
            } catch (error) {
                console.error('Error fetching study materials:', error);
            }
        };

        fetchMaterials();
    }, []);

    return (
        <div className="study-container">
            <h1 className="study-title">Study Materials</h1>
            {materials.length > 0 ? (
                <ul className="study-list">
                    {materials.map((material) => (
                        <li key={material._id} className="study-card">
                            <a
                                href={`http://localhost:5000/${material.filePath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="study-link"
                            >
                                📄 {material.title}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-materials">No study materials available.</p>
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
                    background: #f0f4f8;
                }

                .study-container {
                    max-width: 900px;
                    margin: 40px auto;
                    padding: 20px;
                }

                .study-title {
                    font-size: 32px;
                    text-align: center;
                    margin-bottom: 30px;
                    color: #2c3e50;
                }

                .study-list {
                    list-style: none;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                    padding: 0;
                }

                .study-card {
                    background: #fff;
                    border-radius: 10px;
                    padding: 16px 20px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
                    transition: transform 0.2s ease;
                }

                .study-card:hover {
                    transform: translateY(-5px);
                }

                .study-link {
                    text-decoration: none;
                    color: #2575fc;
                    font-size: 18px;
                    font-weight: 500;
                    transition: color 0.2s ease;
                }

                .study-link:hover {
                    color: #1e60d8;
                }

                .no-materials {
                    text-align: center;
                    color: #e74c3c;
                    font-size: 18px;
                }
            `}</style>
        </div>
    );
};

export default ViewStudyMaterials;
