import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import * as XLSX from 'xlsx';

const AddQuiz = () => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please upload a file.');
            return;
        }

        setIsUploading(true);

        const reader = new FileReader();
        reader.onload = async (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const quizData = XLSX.utils.sheet_to_json(worksheet);

            const formattedQuiz = {
                title: quizData[0]?.QuizTitle || 'Untitled Quiz',
                questions: quizData.map((row) => ({
                    questionText: row.Question,
                    options: [row.Option1, row.Option2, row.Option3, row.Option4],
                    correctAnswer: row.CorrectAnswer,
                })),
            };

            try {
                await axiosInstance.post('/quizzes/upload', formattedQuiz);
                alert('Quiz uploaded successfully!');
                setFile(null);
            } catch (error) {
                console.error('Error uploading quiz:', error);
                alert('Failed to upload quiz.');
            } finally {
                setIsUploading(false);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="quiz-container">
            <div className="quiz-box">
                <h1 className="quiz-title">Upload Complete Quiz</h1>
                <form onSubmit={handleFileUpload} className="quiz-form">
                    <label>
                        Upload .xlsx File:
                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileChange}
                            required
                        />
                    </label>

                    <button type="submit" disabled={isUploading}>
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
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

                .quiz-container {
                    min-height: 100vh;
                    background: linear-gradient(to right, #ff758c, #ff7eb3);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .quiz-box {
                    background-color: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    max-width: 500px;
                    width: 100%;
                }

                .quiz-title {
                    font-size: 24px;
                    text-align: center;
                    margin-bottom: 20px;
                    color: #333;
                }

                .quiz-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .quiz-form label {
                    display: flex;
                    flex-direction: column;
                    font-size: 14px;
                    color: #444;
                }

                .quiz-form input[type="file"] {
                    margin-top: 8px;
                    font-size: 14px;
                }

                .quiz-form button {
                    background-color: #ff758c;
                    color: white;
                    padding: 12px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s ease;
                }

                .quiz-form button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }

                .quiz-form button:hover:enabled {
                    background-color: #e04a67;
                }
            `}</style>
        </div>
    );
};

export default AddQuiz;
