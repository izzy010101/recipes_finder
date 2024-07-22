import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-white py-6">
            <div className="container mx-auto text-center">
                <nav className="flex justify-center space-x-4">
                    <Link to="/" className="text-black font-semibold hover:text-[#df6f35] ">Home</Link>
                    <Link to="/recipe" className="text-black font-semibold hover:text-[#df6f35]">Recipes</Link>
                </nav>
                <p className="mt-4 text-black">© 2024 Recipe Finder. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
