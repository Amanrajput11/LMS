import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('/api/courses/instructor')
            .then(res => setCourses(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Instructor Dashboard</h1>
            <button onClick={() => window.location.href = '/create-course'}>Create New Course</button>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>{course.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
