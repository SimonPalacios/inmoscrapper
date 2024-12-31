import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-grow px-4 py-8 max-w-full">
                {children}
            </main>
            <footer className="bg-blue-600 text-white py-4">
                <div className="w-full px-4 text-center">
                    InmoScrapper
                </div>
            </footer>
        </div>
    );
};


export default Layout;