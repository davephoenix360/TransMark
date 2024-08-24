import React, { useState } from 'react';

interface ChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#191b22] w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-[#03050c]">
          <h2 className="text-xl font-bold text-white">Chatbot</h2>
          <button onClick={onClose} className="text-white hover:text-[#fff500]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="h-80 overflow-y-auto p-4">
          {/* Chat messages will go here */}
        </div>
        <div className="p-4 bg-[#03050c]">
          <form onSubmit={(e) => { e.preventDefault(); /* Handle message send */ }}>
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow p-2 rounded-l-lg bg-[#151517] text-white border border-[#383f45] focus:outline-none focus:border-[#596066]"
              />
              <button
                type="submit"
                className="bg-[#fff500] text-black px-4 py-2 rounded-r-lg hover:bg-white transition-colors duration-300"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWindow;