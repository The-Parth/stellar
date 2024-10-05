// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// context
import { UserProvider } from "./context/userContext";

import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Signup from "./pages/login/signup";
import Dashboard from "./pages/dashboard/dashboard";

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
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
};

export default App;
