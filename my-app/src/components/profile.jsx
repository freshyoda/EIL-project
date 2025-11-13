import React, { useState, useEffect } from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Dashboard from './dashboard.jsx';
import LeavePortal from './LeavePortal.jsx';
// import App from '../App.jsx';

const Profile = ({onLogout}) => {
    const [currentPage, setCurrentPage] = useState('dashboard');

    function navigatePage(page) {
        setCurrentPage(page);
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard />;
            case 'leaves section':
                return <LeavePortal />;
        }
    }
    return (
        <div>
            <div>
                <Header currentPage={currentPage} onNavigate={navigatePage} onLogout={onLogout} />
            </div>
            <div className = "mb-4">
                {renderPage()}
            </div>
            <div className=''>
                <Footer />
            </div>

        </div>
    )
}

export default Profile;
