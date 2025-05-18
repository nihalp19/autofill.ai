import React from 'react'
import { useAuthStore } from '../store/useAuthStore';

function OverLay() {

    const {isSideBarOpen, toogleSideBar } = useAuthStore()

    return (
        <>
            {isSideBarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300"
                    onClick={() => toogleSideBar(false)}
                />
            )}
            {/* Sidebar component here with z-50 */}
            {/* Rest of your Navbar code */}
        </>
    );

}

export default OverLay