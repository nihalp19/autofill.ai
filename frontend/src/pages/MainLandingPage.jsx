import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLandingPage = () => {
    const { isSideBarOpen } = useAuthStore();

    return (
        <main className={`flex-1 transition-all duration-300 ${isSideBarOpen ? 'ml-60' : 'ml-[72px]'}`}>
            <Sidebar />
            <Navbar />
            <Outlet />
        </main>
    );
};

export default MainLandingPage;
