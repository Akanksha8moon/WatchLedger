import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-cinematic-bg text-white font-sans selection:bg-red-500 selection:text-white pb-20">
            {/* Texture Overlay is handled in index.css body */}

            <Navbar />

            {/* Main Content Area */}
            <main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto">
                <Outlet />
            </main>

            {/* Footer (Minimal) */}
            <footer className="py-12 text-center text-gray-600 text-sm">
                <p>&copy; 2025 WatchLedger. Cinematic Utility.</p>
            </footer>
        </div>
    );
};

export default AppLayout;
