import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth';
import Main from './pages/Main';
import HighFive from './pages/HighFive';
import SignUp from "./pages/SignUp.jsx";
import TestPage from "./pages/TestPage.jsx"
import Login from './pages/Login.jsx'

// Protected Route: 로그인 필요 페이지
function ProtectedRoute({ children }) {
  const [user] = useAuthState(auth); // Firebase 사용자 상태 감지
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>} />
        <Route path="/highfive" element={
          <ProtectedRoute>
            <HighFive />
          </ProtectedRoute>} />
        <Route path="/signup" element={
            <SignUp />} />
        <Route path="/test" element={
          <ProtectedRoute>
            <TestPage />
          </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}