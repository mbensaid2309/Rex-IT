import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import REXDetail from './pages/REXDetail';
import CreateREX from './pages/CreateREX';
import Tags from './pages/Tags';
import Profile from './pages/Profile';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rex/:id" element={<REXDetail />} />
                <Route
                  path="/create"
                  element={
                    <ProtectedRoute>
                      <CreateREX />
                    </ProtectedRoute>
                  }
                />
                <Route path="/tags" element={<Tags />} />
                <Route path="/tags/:tag" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
