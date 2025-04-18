import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';

const GiveQuiz = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axiosInstance.get(`/quizzes/${id}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let score = 0;

        if (quiz && quiz.questions) {
            quiz.questions.forEach((question) => {
                if (answers[question._id] === question.correctAnswer) {
                    score += 1;
                }
            });
        }

        setResult(`You scored ${score} out of ${quiz.questions?.length || 0}`);
    };

    if (!quiz) {
        return <p>Loading quiz...</p>;
    }

    if (!quiz.questions || quiz.questions.length === 0) {
        return <p>No questions available for this quiz.</p>;
    }

    return (
        <div className="quiz-container">
            <div className="quiz-box">
                <h1 className="quiz-title">{quiz.title}</h1>
                <form onSubmit={handleSubmit} className="quiz-form">
                    {quiz.questions.map((question) => (
                        <div key={question._id} className="question-block">
                            <p className="question-text">{question.questionText}</p>
                            <div className="options-group">
                                {question.options.map((option, index) => (
                                    <label key={index} className="option-label">
                                        <input
                                            type="radio"
                                            name={question._id}
                                            value={option}
                                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                            required
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="submit-button">Submit</button>
                </form>
                {result && <h2 className="result-text">{result}</h2>}
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
                    background: linear-gradient(to right, #4facfe, #00f2fe);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 30px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .quiz-box {
                    background: #fff;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 700px;
                }

                .quiz-title {
                    font-size: 26px;
                    margin-bottom: 25px;
                    text-align: center;
                    color: #333;
                }

                .quiz-form {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }

                .question-block {
                    padding-bottom: 15px;
                    border-bottom: 1px solid #ddd;
                }

                .question-text {
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .options-group {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .option-label {
                    font-size: 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                }

                .option-label input[type="radio"] {
                    accent-color: #4facfe;
                }

                .submit-button {
                    margin-top: 20px;
                    background-color: #4facfe;
                    color: white;
                    padding: 12px 20px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background 0.3s ease;
                }

                .submit-button:hover {
                    background-color: #3195ff;
                }

                .result-text {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 20px;
                    color: green;
                }
            `}</style>
        </div>
    );
};

export default GiveQuiz;
