import React, { useState, useEffect } from 'react';
import CaptchaComponent from './CaptchaComponent';
import { Link, useNavigate } from "react-router-dom";
import bgImage from '../assets/EILPHOTO.jpg';
import logo from '../assets/EILPHOTO2.png';

// Dummy users data with additional details
const users = {
    'emp001': { 
        password: 'emp123', 
        role: 'EMP', 
        name: 'John Employee',
        email: 'john.employee@eil.com',
        department: 'Engineering',
        employeeId: 'EMP001',
        designation: 'Senior Engineer',
        joinDate: '2020-01-15',
        dateOfBirth: '1990-05-15',
        phoneNo: '+91-9876543210',
        street: '123 Park Street',
        city: 'New Delhi',
        zipCode: '110001',
        state: 'Delhi',
        leaveBalance: {
            casual: 10,
            sick: 15,
            earned: 30
        }
    },
    'admin001': { 
        password: 'admin123', 
        role: 'AMD', 
        name: 'Admin User',
        email: 'admin.user@eil.com',
        department: 'Human Resources',
        employeeId: 'ADM001',
        designation: 'HR Manager',
        joinDate: '2018-03-20',
        dateOfBirth: '1985-08-20',
        phoneNo: '+91-9876543211',
        street: '456 HR Block',
        city: 'New Delhi',
        zipCode: '110002',
        state: 'Delhi'
    },
    'emp002': { 
        password: 'emp456', 
        role: 'EMP', 
        name: 'Jane Employee',
        email: 'jane.employee@eil.com',
        department: 'Project Management',
        employeeId: 'EMP002',
        designation: 'Project Manager',
        joinDate: '2019-06-10',
        dateOfBirth: '1992-11-30',
        phoneNo: '+91-9876543212',
        street: '789 Project Avenue',
        city: 'New Delhi',
        zipCode: '110003',
        state: 'Delhi',
        leaveBalance: {
            casual: 8,
            sick: 12,
            earned: 25
        }
    }
};

const LoginPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!captchaVerified) {
            setErrorMessage('❌ Please solve the CAPTCHA correctly');
            return;
        }

        // Check if user exists and validate credentials
        const user = users[username];
        if (!user) {
            setErrorMessage('❌ User not found');
            return;
        }

        if (user.password !== password) {
            setErrorMessage('❌ Invalid password');
            return;
        }

        // Login successful
        setIsLoggedIn(true);
        // Store all user data in localStorage
        localStorage.setItem('user', JSON.stringify({
            username,
            ...user,  // This spreads all user data
            password: undefined // Remove password for security
        }));

        // Redirect based on role
        if (user.role === 'EMP') {
            navigate('/profile', { state: { userData: user } });
        } else if (user.role === 'AMD') {
            navigate('/hr-dashboard', { state: { userData: user } });
        } else {
            setErrorMessage('❌ Access denied: Unrecognized role.');
        }
    };

    const handleLogout = () => {
    // Here you would clear tokens, cookies, or local storage
    console.log("Logging out...");
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

    useEffect(() => {
        document.title = "EIL-Login";
    }, []);

    return (
        <div id="login-body" style={{ backgroundImage: `url(${bgImage})` }} className="bg-cover bg-center h-screen w-full no-repeat bg-[top_center] flex justify-center items-center">
            <div className="flex items-center justify-center min-h-screen w-full backdrop-blur-sm">
                <div className="bg-white/80 p-8 rounded-lg shadow-xl w-full h-50 max-w-sm text-center shadow-[8px_8px_20px_rgba(0,0,0,1)]">
                    <img
                        src={logo}
                        alt="Description of image"
                        className="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg"
                    />
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-4 text-left">
                            <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
                            />
                        </div>
                        <div className="mb-6 text-left">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
                            />
                        </div>

                        <CaptchaComponent onVerify={setCaptchaVerified} />


                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150 ease-in-out mt-4"
                        >
                            Login
                        </button>
                        {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}

                        <div className="mt-4 text-sm">
                            <Link
                                to="/forgot-password"
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
