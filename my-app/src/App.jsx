import reactLogo from './assets/react.svg'
import Home from './components/lander.jsx';
import LoginPage from './components/new_login';
import "./App.css"; // Ensure to import your CSS file
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/forgot_pass.jsx";
import Profile from './components/profile.jsx';

import { useState } from 'react';
import HRDashboard from './components/hr/HRDashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path = "/hr-dashboard" element={<HRDashboard />} />
        <Route path="/profile" element={<Profile/>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;


// function App() {
//   const [currentPage, setCurrentPage] = useState('main'); // 'main' or 'hr-dashboard'

//   if (currentPage === 'hr-dashboard') {
//     return <HRDashboard onBack={() => setCurrentPage('main')} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Your existing app content here */}
//       <div className="p-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">My React App</h1>
        
//         {/* Button to access HR Dashboard */}
//         <button
//           onClick={() => setCurrentPage('hr-dashboard')}
//           className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
//         >
//           Open HR Dashboard
//         </button>
        
//         {/* Your existing components go here */}
//       </div>
//     </div>
//   );
// }

// export default App;