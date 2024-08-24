'use client'
import React, { useState } from 'react';
import Footer from '../../../componenets/Footer';
import Navbar from '../../../componenets/Navbar';
import ChatbotWindow from '../../../componenets/ChatbotWindow';
import TranscriptEditor from '../../../componenets/TranscriptEditor';

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedTranscript, setSelectedTranscript] = useState(null);

  return (
    <>
      <Navbar />
      <div className="bg-[#03050c] min-h-screen text-[#fafafa] pt-12 px-4 sm:px-6">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-6 mt-6">Transcripts</h1>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[#03050c] sticky top-12 z-10 mt-6">
          <input 
            type="text" 
            placeholder="Search transcripts..." 
            className="w-full sm:w-2/3 p-3 rounded-lg bg-[#151517] text-white border border-[#383f45] focus:outline-none focus:border-[#596066] mb-4 sm:mb-0"
          />
          <div className="w-full sm:w-auto">
            <button 
              className="btn-primary w-full sm:hidden mb-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            <div className={`flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 ${isFilterOpen ? 'block' : 'hidden sm:flex'}`}>
              <button className="btn-primary w-full sm:w-auto">Filter by Date</button>
              <button className="btn-primary w-full sm:w-auto">Filter by Agent</button>
              <button className="btn-primary w-full sm:w-auto">Filter by Tag</button>
            </div>
          </div>
        </div>

        {/* Transcript Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-6">
          {/* Transcript Card (Example) */}
          <div className="bg-[#191b22] p-6 rounded-lg shadow-md hover:border-[#383f45] border border-transparent transition-colors flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-white mb-2">Transcript Title</h3>
            <div className="text-[#9ea5ad] mb-4">
              <p><span className="font-bold text-[#ced2d6]">Created:</span> 10/08/2024</p>
              <p><span className="font-bold text-[#ced2d6]">Modified:</span> 12/08/2024</p>
              <p className="mt-2">Snippet or details of the transcript goes here...</p>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button 
                className="p-2 rounded-full bg-[#fff500] hover:bg-white transition-colors duration-300 group relative"
                onClick={() => {
                  setSelectedTranscript({
                    id: "1234",
                    title: "Customer Support Call #1234",
                    lines: [
                      {
                        speaker: { name: "Agent", isAgent: true },
                        text: "Thank you for calling our support line. How may I assist you today?"
                      },
                      {
                        speaker: { name: "Customer", isAgent: false },
                        text: "Hi, I'm having trouble logging into my account. Can you help me?"
                      },
                      {
                        speaker: { name: "Agent", isAgent: true },
                        text: "Of course, I'd be happy to help. Can you please provide me with your username or email address associated with the account?"
                      },
                      {
                        speaker: { name: "Customer", isAgent: false },
                        text: "Sure, my email is john.doe@example.com"
                      },
                      {
                        speaker: { name: "Agent", isAgent: true },
                        text: "Thank you. I've located your account. Let's try resetting your password. I'll send you an email with instructions. Is that okay?"
                      },
                      {
                        speaker: { name: "Customer", isAgent: false },
                        text: "Yes, that would be great. Thank you!"
                      }
                    ]
                  });
                  setIsEditorOpen(true);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Add Comment</span>
              </button>
              <button className="p-2 rounded-full bg-[#fff500] hover:bg-white transition-colors duration-300 group relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">View Summary</span>
              </button>
              <button 
                className="p-2 rounded-full bg-[#fff500] hover:bg-white transition-colors duration-300 group relative"
                onClick={() => setIsChatbotOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Open Chatbot</span>
              </button>
            </div>
          </div>
          {/* Add more transcript cards here */}
        </div>
      </div>
     
      {/* Remove the Footer component if it's not defined */}
      <ChatbotWindow isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
      <TranscriptEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        transcript={selectedTranscript}
      />
    </>
  );
}