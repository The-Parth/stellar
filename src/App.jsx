// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import { GoogleOAuthProvider } from '@react-oauth/google';



const App = () => {
  return (
    <GoogleOAuthProvider clientId="1093237686281-d74iebn0g6r41qk6l7tcb51irsgbv45l.apps.googleusercontent.com">

    <Router>
      <div>
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<><div>HII</div></>}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>

    </GoogleOAuthProvider>
  );
};

export default App;