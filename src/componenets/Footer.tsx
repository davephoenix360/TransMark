import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-gray-50 sm:p-6 dark:bg-gray-800 mt-auto w-full">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TransMark</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="https://github.com/boxerarakelyan777/ProfMatcher" className="hover:underline">GitHub</a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@memorixai " className="hover:underline">TikTok</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" className="hover:underline">Terms & Conditions</a>
                </li>
              </ul> 
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 <a href="/" className="hover:underline">TransMark™</a>. All Rights Reserved.
          </span>

        </div>
      </div>
    </footer>
  );
};

export default Footer;