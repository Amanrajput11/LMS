import React, { useState } from 'react';
import axiosInstance from '../api/axiosConfig';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/users/register', { name, email, password });
            alert('Signup successful');
            console.log('User registered:', response.data);
            setError(null);
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Failed to register. Please check your input.');
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignup}>
                <h2 className="signup-title">Create Account</h2>

                {error && <p className="signup-error">{error}</p>}

                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                />

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
                    placeholder="Create a password"
                />

                <button type="submit">Sign Up</button>
            </form>

            <style>{`
            body{
                margin: 0;
                padding: 0; 
                }
                .signup-container {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(to right, #43cea2, #185a9d);
                    font-family: Arial, sans-serif;
                }

                .signup-form {
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

                .signup-title {
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
                    border-color: #43cea2;
                    outline: none;
                }

                button {
                    background-color: #43cea2;
                    color: white;
                    padding: 12px;
                    border: none;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                button:hover {
                    background-color: #38b593;
                }

                .signup-error {
                    color: red;
                    text-align: center;
                    font-size: 14px;
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
};

export default SignupPage;
