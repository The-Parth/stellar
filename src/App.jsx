// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// context
import { UserProvider } from "./context/userContext";

import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Signup from "./pages/login/signup";
import Logout from "./pages/login/logout";
import Dashboard from "./pages/dashboard/dashboard";
import CreateQuiz from "./pages/create_quiz/create";
import EditQuiz from "./pages/create_quiz/edit";
import PlayQuiz from "./pages/play/play2";
import Explore from "./pages/explore/explore";
import ResultPage from "./pages/play/result";

import "./App.css";

const App = () => {
    return (
        <UserProvider>
            <Router>
                <div>
                    {/* Define your routes */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Signup />} />
                        <Route path="/logout" element={<Logout />} />

                        <Route path="/dashboard" element={<Dashboard />} />

                        <Route path="/explore" element={<Explore />} />

                        <Route path="/create" element={<CreateQuiz />} />
                        <Route path="/edit_quiz/:quizId" element={<EditQuiz />} />

                        <Route path="/play/:quizId" element={<PlayQuiz />} />
                        <Route path="/result/:attemptId" element={<ResultPage />} />
                        
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
};

export default App;
