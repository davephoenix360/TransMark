import React from 'react';

interface TranscriptLine {
  speaker: {
    name: string;
    isAgent: boolean;
  };
  text: string;
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
          {transcript.lines.map((line, index) => (
            <div key={index} className="flex items-start mb-4">
              {line.speaker.isAgent ? <AgentIcon /> : <CustomerIcon />}
              <div className="ml-3">
                <span className="font-semibold text-white">{line.speaker.name}</span>
                <p className="text-gray-300 mt-1">{line.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#03050c] p-4 flex justify-end">
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default TranscriptEditor;