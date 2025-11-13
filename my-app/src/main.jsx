import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoginPage from './components/new_login.jsx';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Profile from './components/profile.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from './components/forgot_pass.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)