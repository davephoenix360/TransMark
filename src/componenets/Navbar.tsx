"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#03050c] text-[#fafafa]">
      <nav className="px-4 lg:px-6 py-4">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-bold text-[#fff500] whitespace-nowrap">
              TransMark
            </span>
          </Link>
          
          {/* Center-aligned navigation buttons */}
          <div className="hidden lg:flex items-center justify-center flex-grow">
            <ul className="flex space-x-8">
              <li>
                <Link href="/dashboard" className="block py-2 pr-4 pl-3 text-[#fafafa] hover:text-[#fff500] transition-colors duration-300 lg:p-0 lg:text-lg">
                  Dashboard
                </Link>
              </li>
              <li>

                <Link href="/transcripts" className="block py-2 pr-4 pl-3 text-[#fafafa] hover:text-[#fff500] transition-colors duration-300 lg:p-0 lg:text-lg">
                  Transcripts
                </Link>
              </li>
              <li>
              <Link href="/summary" className="block py-2 pr-4 pl-3 text-[#fafafa] hover:text-[#fff500] transition-colors duration-300 lg:p-0 lg:text-lg">
                  Summary
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center lg:order-2">
            <Link href="/contactus" className="text-[#292929] bg-[#fff500] hover:bg-white hover:text-[#292929] transition-colors duration-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5">
              Help?
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-[#fafafa] rounded-lg lg:hidden hover:bg-[#191b22] focus:outline-none focus:ring-2 focus:ring-[#fff500]"
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
        </div>
      </nav>
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden bg-[#191b22]`} id="mobile-menu-2">
        <div className="px-4 py-6 space-y-4">
          <Link href="/dashboard" className="block text-[#fafafa] hover:text-[#fff500] transition-colors duration-300 font-medium">Dashboard</Link>
          <Link href="/transcripts" className="block text-[#fafafa] hover:text-[#fff500] transition-colors duration-300 font-medium">Transcripts</Link>
          <Link href="/summary" className="block text-[#fafafa] hover:text-[#fff500] transition-colors duration-300 font-medium">Summary</Link>
          
          <Link href="/contactus" className="block text-[#292929] bg-[#fff500] hover:bg-white transition-colors duration-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Help?</Link>
        </div>
      </div>
      {/* Add a white line for separation */}
      <div className="h-px bg-white opacity-20"></div>
    </header>
  );
};

export default Navbar;