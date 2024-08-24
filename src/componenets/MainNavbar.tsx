"use client";

import React, { useState } from 'react';
import Link from 'next/link';


const MainNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header>
      <nav className="fixed w-full z-30 top-0 px-4 lg:px-6 py-3 bg-[#03050c]">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-bold text-[#fafafa] whitespace-nowrap">
            TransMark
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link href="/dashboard" className="text-[#fafafa] hover:text-[#fff500] focus:ring-4 focus:ring-[#fff500] font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 transition-colors duration-300">
              Dashboard
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link href="#" className="block py-2 pr-4 pl-3 text-[#fafafa] hover:text-[#fff500] transition-colors duration-300 rounded lg:p-0 lg:text-lg lg:font-semibold">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#features" className="block py-2 pr-4 pl-3 text-[#fafafa] hover:text-[#fff500] transition-colors duration-300 rounded lg:p-0 lg:text-lg lg:font-semibold">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#contact" className="block py-2 pr-4 pl-3 text-[#fafafa] hover:text-[#fff500] transition-colors duration-300 rounded lg:p-0 lg:text-lg lg:font-semibold">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 text-[#fafafa] rounded-lg lg:hidden hover:bg-[#191b22] focus:outline-none focus:ring-2 focus:ring-[#fff500] ml-2"
            aria-controls="mobile-menu-2"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className={`w-6 h-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
            <svg className={`w-6 h-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </nav>
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} fixed top-[60px] left-0 w-full bg-[#03050c] shadow-xl transition-all duration-300 ease-in-out z-20 lg:hidden`} id="mobile-menu-2">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <ul className="space-y-4 text-right">
            <li>
              <Link href="#" className="inline-block text-lg font-semibold text-[#fafafa] hover:text-[#fff500] transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="#features" className="inline-block text-lg font-semibold text-[#fafafa] hover:text-[#fff500] transition-colors duration-300">
                Features
              </Link>
            </li>
            <li>
              <Link href="#contact" className="inline-block text-lg font-semibold text-[#fafafa] hover:text-[#fff500] transition-colors duration-300">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="inline-block text-[#fafafa] hover:text-[#fff500] focus:ring-4 focus:ring-[#fff500] font-medium rounded-lg text-lg px-6 py-3 transition-colors duration-300">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;