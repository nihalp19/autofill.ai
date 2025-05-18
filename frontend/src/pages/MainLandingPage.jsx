import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../store/useAuthStore';
import OverLay from '../components/OverLay';

const MainLandingPage = () => {
    const { user } = useAuthStore();

    return (
        <div>

            
            <Navbar />
            <Sidebar />
            <OverLay />
            <Outlet />
        </div>
    );
};

export default MainLandingPage;
