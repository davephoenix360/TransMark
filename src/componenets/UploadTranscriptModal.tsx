import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { formatDateTime } from '../utils/dateUtils';

interface UploadTranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (transcript: Transcript) => void;
}

const UploadTranscriptModal: React.FC<UploadTranscriptModalProps> = ({ isOpen, onClose, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const requestBody = {
        title,
        content,
        createdDate: new Date().toISOString(),
      };

      console.log('Sending request with data:', JSON.stringify(requestBody));

      const response = await axios.post(
        'https://pde9nag7w2.execute-api.us-east-2.amazonaws.com/Dev1/upload-transcript',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      console.log('Response:', response.data);

      if (response.data.Operation === 'UPLOAD' && response.data.Message === 'SUCCESS') {
        const newTranscript: Transcript = response.data.Item;
        onUploadSuccess(newTranscript);
        resetForm();
        onClose();
      } else {
        throw new Error(response.data.Message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading transcript:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response data:', error.response.data);
        setError(`Failed to upload transcript: ${error.response.data.message || error.message}`);
      } else {
        setError('Failed to upload transcript. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-[#191b22] p-6 text-[#fafafa]">
          <Dialog.Title className="text-2xl font-bold mb-4">Upload Transcript</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#151517] text-white border border-[#383f45] focus:outline-none focus:border-[#596066]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Transcript Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#151517] text-white border border-[#383f45] focus:outline-none focus:border-[#596066]"
                rows={10}
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="px-4 py-2 text-sm font-medium text-black bg-[#fff500] rounded-lg hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-black bg-[#fff500] rounded-lg hover:bg-white transition-colors"
              >
                {isLoading ? 'Uploading...' : 'Upload Transcript'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UploadTranscriptModal;