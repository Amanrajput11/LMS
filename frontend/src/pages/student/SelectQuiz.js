import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';

const SelectQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axiosInstance.get('/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <div className="quiz-selection-container">
            <div className="quiz-selection-box">
                <h1 className="quiz-title">Select a Quiz</h1>
                {quizzes.length > 0 ? (
                    <ul className="quiz-list">
                        {quizzes.map((quiz) => (
                            <li key={quiz._id} className="quiz-item">
                                <Link to={`/student/quiz/${quiz._id}`} className="quiz-link">{quiz.title}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-quizzes">No quizzes available.</p>
                )}
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

                .quiz-selection-container {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(to right, #6a11cb, #2575fc);
                    padding: 30px;
                    font-family: 'Arial', sans-serif;
                }

                .quiz-selection-box {
                    background: #fff;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 600px;
                    text-align: center;
                }

                .quiz-title {
                    font-size: 28px;
                    margin-bottom: 30px;
                    color: #333;
                    font-weight: bold;
                }

                .quiz-list {
                    list-style-type: none;
                    padding: 0;
                }

                .quiz-item {
                    margin: 15px 0;
                    font-size: 18px;
                }

                .quiz-link {
                    color: #2575fc;
                    text-decoration: none;
                    font-weight: bold;
                    padding: 10px 20px;
                    border-radius: 6px;
                    background: #e0f7fa;
                    transition: background 0.3s ease;
                }

                .quiz-link:hover {
                    background: #b2ebf2;
                }

                .no-quizzes {
                    font-size: 18px;
                    color: #d9534f;
                }
            `}</style>
        </div>
    );
};

export default SelectQuiz;
