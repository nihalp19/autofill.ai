import React from 'react';
import { motion } from 'framer-motion';
import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Dashboard = () => {
    const { isSideBarOpen } = useAuthStore();

    return (
        <main className={`flex-1 transition-all duration-300 ${isSideBarOpen ? 'ml-60' : 'ml-[72px]'}`}>
            dashboard
        </main>
    );
};

export default Dashboard;
