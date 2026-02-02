import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage } from './pages/Auth/LoginPage';
import { SignupPage } from './pages/Auth/SignUpPage';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { ResearcherDashboard } from './pages/researcher/ResearcherDashboard';
import { ResearchRepositoryPage } from './pages/researcher/ResearchRepositoryPage';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { MentorDashboard } from './pages/mentor/MentorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* ───── Public Routes ───── */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* ───── App Routes ───── */}
        <Route path="/student/*" element={<StudentDashboard />} />
        <Route path="/teacher/*" element={<TeacherDashboard />} />
        <Route path="/mentor/*" element={<MentorDashboard />} />


        <Route path="/researcher/*" element={<ResearcherDashboard />} />
        <Route path="/researcher/repo" element={<ResearchRepositoryPage />} />

        {/* ───── Root Redirect ───── */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ───── Catch All ───── */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
