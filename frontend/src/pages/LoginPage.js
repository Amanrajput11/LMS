import React, { useState } from 'react';
import axiosInstance from '../api/axiosConfig';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/users/login', { email, password });
            const { user } = response.data;

            alert(`Login successful! Role: ${user.role}`);
            setError(null);

            if (user.role === 'admin') {
                window.location.href = '/admin-dashboard';
            } else if (user.role === 'student') {
                window.location.href = '/student-dashboard';
            } else {
                alert('Unknown role');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Failed to login. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="login-title">Login</h2>

                {error && <p className="login-error">{error}</p>}

                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter password"
                />

                <button type="submit">Login</button>
            </form>

            <style>{`
            body{
                margin: 0;
                padding: 0; 
                }
                .login-container {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(to right, #667eea, #764ba2);
                    font-family: Arial, sans-serif;
                }

                .login-form {
                    background: white;
                    padding: 30px 40px;
                    border-radius: 10px;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
                    width: 100%;
                    max-width: 400px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .login-title {
                    text-align: center;
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 10px;
                }

                label {
                    font-size: 14px;
                    color: #555;
                }

                input {
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    transition: border-color 0.3s;
                }

                input:focus {
                    border-color: #667eea;
                    outline: none;
                }

                button {
                    background-color: #667eea;
                    color: white;
                    padding: 12px;
                    border: none;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                button:hover {
                    background-color: #5a67d8;
                }

                .login-error {
                    color: red;
                    text-align: center;
                    font-size: 14px;
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
