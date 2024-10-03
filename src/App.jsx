// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Signup from "./pages/login/signup";

const App = () => {
    return (
        <GoogleOAuthProvider clientId="1093237686281-d74iebn0g6r41qk6l7tcb51irsgbv45l.apps.googleusercontent.com">
            <Router>
                <div>
                    {/* Define your routes */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Signup />} />
                    </Routes>
                </div>
            </Router>
        </GoogleOAuthProvider>
    );
};

export default App;
