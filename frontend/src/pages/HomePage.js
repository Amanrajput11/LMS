import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="homepage">
            <header className="navbar">
                <div className="logo">📘 MyLMS</div>
                <div className="auth-buttons">
                    <Link to="/login" className="btn">Login</Link>
                    <Link to="/signup" className="btn signup">Sign Up</Link>
                </div>
            </header>

            <section className="hero">
                <div className="hero-text">
                    <h1>Learn Anytime, Anywhere with MyLMS</h1>
                    <p>Your one-stop platform for quality online education. Courses, quizzes, study materials — all in one place.</p>
                    <Link to="/signup" className="btn get-started">Get Started</Link>
                </div>
                <div className="hero-image">
                    <img src="https://img.freepik.com/free-vector/online-learning-concept_23-2148683564.jpg" alt="LMS" />
                </div>
            </section>

            <section className="features">
                <h2>Features</h2>
                <div className="features-grid">
                    <div className="feature-box">
                        <h3>🎓 Online Courses</h3>
                        <p>Access a wide variety of courses created by industry experts.</p>
                    </div>
                    <div className="feature-box">
                        <h3>📄 Study Materials</h3>
                        <p>Download PDFs, watch lectures, and enhance your learning.</p>
                    </div>
                    <div className="feature-box">
                        <h3>📝 Interactive Quizzes</h3>
                        <p>Test your knowledge with real-time quizzes and feedback.</p>
                    </div>
                    <div className="feature-box">
                        <h3>📊 Progress Tracking</h3>
                        <p>Monitor your learning journey and stay motivated.</p>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <h2>What Students Say</h2>
                <div className="testimonial-list">
                    <div className="testimonial">
                        <p>"This platform changed how I study. Super convenient and helpful!"</p>
                        <span>- Priya, B.Tech Student</span>
                    </div>
                    <div className="testimonial">
                        <p>"The quizzes helped me stay on track and understand better."</p>
                        <span>- Rohan, MBA Student</span>
                    </div>
                    <div className="testimonial">
                        <p>"Love the layout and ease of access to all materials!"</p>
                        <span>- Sana, High School</span>
                    </div>
                </div>
            </section>

            <section className="cta">
                <h2>Join thousands of learners today</h2>
                <p>Start your journey with MyLMS and take control of your learning.</p>
                <Link to="/signup" className="btn cta-btn">Sign Up Now</Link>
            </section>

            <footer className="footer">
                <p>© {new Date().getFullYear()} MyLMS. All rights reserved.</p>
                <p>Design by Aman Singh Rajput</p>
            </footer>

            <style>{`
                * { margin: 0; padding: 0; box-sizing: border-box; }

                body, html, .homepage {
                    font-family: 'Segoe UI', sans-serif;
                    background: #fefefe;
                    color: #2c3e50;
                }

                .navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 60px;
                    background-color: #ffffff;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }

                .logo {
                    font-size: 26px;
                    font-weight: bold;
                    color: #34495e;
                }

                .auth-buttons .btn {
                    margin-left: 12px;
                    padding: 10px 18px;
                    border-radius: 6px;
                    text-decoration: none;
                    font-weight: 500;
                    background-color: #1abc9c;
                    color: #fff;
                    transition: 0.3s;
                }

                .auth-buttons .signup {
                    background-color: #3498db;
                }

                .auth-buttons .btn:hover {
                    opacity: 0.9;
                }

                .hero {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
                    padding: 60px 80px;
                    background: linear-gradient(to right, #dbeafe, #e0f7fa);
                }

                .hero-text {
                    flex: 1;
                    max-width: 600px;
                }

                .hero-text h1 {
                    font-size: 44px;
                    margin-bottom: 20px;
                    color: #1f2937;
                }

                .hero-text p {
                    font-size: 18px;
                    margin-bottom: 30px;
                    color: #374151;
                }

                .hero-text .get-started {
                    background: #10b981;
                    padding: 12px 24px;
                    font-size: 16px;
                    border-radius: 8px;
                    color: white;
                    text-decoration: none;
                }

                .hero-image {
                    flex: 1;
                    text-align: center;
                }

                .hero-image img {
                    width: 90%;
                    max-width: 500px;
                    border-radius: 12px;
                }

                .features {
                    padding: 60px 40px;
                    background: #f9fafb;
                    text-align: center;
                }

                .features h2 {
                    font-size: 32px;
                    margin-bottom: 40px;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 25px;
                    max-width: 1000px;
                    margin: auto;
                }

                .feature-box {
                    background: white;
                    padding: 25px;
                    border-radius: 10px;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
                }

                .feature-box h3 {
                    font-size: 20px;
                    margin-bottom: 10px;
                    color: #2563eb;
                }

                .testimonial-list {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 30px;
                    padding: 40px 20px;
                }

                .testimonials {
                    padding: 60px 20px;
                    background-color: #e0f2f1;
                    text-align: center;
                }

                .testimonials h2 {
                    font-size: 32px;
                    margin-bottom: 30px;
                }

                .testimonial {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    width: 280px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                }

                .testimonial p {
                    font-style: italic;
                    margin-bottom: 10px;
                }

                .testimonial span {
                    font-weight: 500;
                    color: #333;
                }

                .cta {
                    padding: 60px 20px;
                    background-color: #1abc9c;
                    color: white;
                    text-align: center;
                }

                .cta h2 {
                    font-size: 30px;
                    margin-bottom: 10px;
                }

                .cta p {
                    margin-bottom: 20px;
                    font-size: 18px;
                }

                .cta .cta-btn {
                    background-color: white;
                    color: #1abc9c;
                    padding: 12px 26px;
                    font-weight: bold;
                    border-radius: 8px;
                    text-decoration: none;
                }

                .footer {
                    text-align: center;
                    padding: 20px;
                    background-color: #f1f5f9;
                    color: #6b7280;
                    font-size: 14px;
                }

                @media (max-width: 768px) {
                    .hero {
                        flex-direction: column;
                        padding: 40px 20px;
                    }

                    .hero-text, .hero-image {
                        max-width: 100%;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default HomePage;
