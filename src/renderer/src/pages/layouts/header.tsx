import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from '@renderer/router';
import hklogo from '@renderer/assets/hklogo.png';

const Header = () => {
    return (
        <div className="w-full h-14 bg-blue-500 flex items-center px-4 fixed top-0 left-0 right-0 z-50 shadow-md">
            <Link to="/" className="text-white hover:bg-blue-600 transition-colors p-2 rounded-full">
                <ChevronLeft size={24} />
            </Link>
            <h1 className="text-xl font-semibold text-white ml-4">PhotoBooth AI</h1>
            <img src={hklogo} alt="HK Logo" className="h-8 ml-auto" />
        </div>
    );
};

export default Header;
