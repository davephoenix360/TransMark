import React, { useState } from 'react';

interface TranscriptLine {
  id: string;
  speaker: {
    name: string;
    isAgent: boolean;
  };
  text: string;
  comments: string[];
}

interface TranscriptEditorProps {
  isOpen: boolean;
  onClose: () => void;
  transcript: {
    title: string;
    lines: TranscriptLine[];
  } | null;
}

const TranscriptEditor: React.FC<TranscriptEditorProps> = ({ isOpen, onClose, transcript }) => {
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  if (!isOpen || !transcript) return null;

  const AgentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
    </svg>
  );

  const CustomerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  );

  const handleCommentSubmit = (lineId: string) => {
    // Add logic to save the comment
    console.log('New comment for line', lineId, ':', newComment);
    setNewComment('');
    setActiveCommentId(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#191b22] w-11/12 h-5/6 rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="bg-[#03050c] p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{transcript.title}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {transcript.lines.map((line) => (
            <div key={line.id} className="mb-6 bg-[#222530] p-4 rounded-lg">
              <div className="flex items-start mb-2">
                {line.speaker.isAgent ? <AgentIcon /> : <CustomerIcon />}
                <div className="ml-3 flex-grow">
                  <span className="font-semibold text-white">{line.speaker.name}</span>
                  <p className="text-gray-300 mt-1">{line.text}</p>
                </div>
              </div>
              <div className="mt-2 ml-11">
                <button 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
                  onClick={() => setActiveCommentId(line.id)}
                >
                  Reply
                </button>
              </div>
              {line.comments.map((comment, index) => (
                <div key={index} className="ml-11 mt-2 bg-[#2a2e3b] p-3 rounded-lg">
                  <p className="text-gray-300">{comment}</p>
                </div>
              ))}
              {activeCommentId === line.id && (
                <div className="ml-11 mt-4">
                  <div className="bg-[#2a2e3b] p-4 rounded-lg shadow-inner">
                    <textarea
                      className="w-full p-2 rounded bg-[#343845] text-white border border-[#4a4f5e] focus:outline-none focus:border-[#596066] focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      rows={3}
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end mt-3 space-x-2">
                      <button 
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors duration-200 text-sm"
                        onClick={() => {
                          setActiveCommentId(null);
                          setNewComment('');
                        }}
                      >
                        Cancel
                      </button>
                      <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200 text-sm"
                        onClick={() => handleCommentSubmit(line.id)}
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TranscriptEditor;