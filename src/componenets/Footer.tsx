import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#03050c] text-[#fafafa] p-4 sm:p-6 mt-auto w-full">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#fff500]">TransMark</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-[#fff500]">Follow us</h2>
              <ul className="text-[#9ea5ad]">
                <li className="mb-4">
                  <a href="https://github.com/boxerarakelyan777/ProfMatcher" className="hover:text-white transition-colors duration-300">GitHub</a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@memorixai" className="hover:text-white transition-colors duration-300">TikTok</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-[#fff500]">Legal</h2>
              <ul className="text-[#9ea5ad]">
                <li className="mb-4">
                  <a href="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors duration-300">Terms & Conditions</a>
                </li>
              </ul> 
            </div>
          </div>
        </div>
        <hr className="my-6 border-[#383f45] sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-[#9ea5ad] sm:text-center">
            © 2024 <a href="/" className="hover:text-white transition-colors duration-300">TransMark™</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;