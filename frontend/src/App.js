import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AddCourse from './pages/admin/AddCourse';
import AddStudyMaterial from './pages/admin/AddStudyMaterial';
import AddQuiz from './pages/admin/AddQuiz';
import SelectQuiz from './pages/student/SelectQuiz';
import GiveQuiz from './pages/student/GiveQuiz';
import ViewStudyMaterials from './pages/student/ViewStudyMaterials';
import ViewCourses from './pages/student/ViewCourses';
import StudentProfile from './pages/student/StudentProfile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/course/:id" element={<CoursePage />} />
                
                {/* Admin Pages */}
                <Route path="/admin/add-course" element={<AddCourse />} />
                <Route path="/admin/add-study-material" element={<AddStudyMaterial />} />
                <Route path="/admin/add-quiz" element={<AddQuiz />} />

                {/* Student Routes */}
                <Route path="/student/give-quiz" element={<SelectQuiz />} />
                <Route path="/student/quiz/:id" element={<GiveQuiz />} />
                <Route path="/student/view-study-materials" element={<ViewStudyMaterials />} />
                <Route path="/student/view-courses" element={<ViewCourses />} />
                <Route path="/student/profile" element={<StudentProfile />} />
            </Routes>
        </Router>
    );
}

export default App;
