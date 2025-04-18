import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                <li><Link to="/admin/add-course">Add Course</Link></li>
                <li><Link to="/admin/add-study-material">Add Study Material</Link></li>
                <li><Link to="/admin/add-quiz">Add Quiz</Link></li>
            </ul>
        </div>
    );
};

export default Dashboard;
