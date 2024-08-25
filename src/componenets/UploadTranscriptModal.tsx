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
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setError('');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileContent = event.target?.result as string;
      // Remove the data URL prefix if present
      const base64Content = fileContent.split(',')[1] || fileContent;

      try {
        const requestBody = {
          file: base64Content,
          file_name: file.name,
          title,
          description,
          createdDate: new Date(file.lastModified).toISOString(),
        };

        console.log('Sending request with data:', {
          ...requestBody,
          file: base64Content.substring(0, 100) + '...' // Log only the first 100 characters of the file content
        });

        const response = await axios.post(
          'https://pde9nag7w2.execute-api.us-east-2.amazonaws.com/Dev1/upload-transcript',
          JSON.stringify(requestBody),
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        
        console.log('Response:', response.data);

        if (response.data.Operation === 'UPLOAD' && response.data.Message === 'SUCCESS') {
          console.log('Upload successful:', response.data);
          const newTranscript: Transcript = response.data.Item;
          handleUploadSuccess(newTranscript);
          resetForm();
          onClose();
        } else {
          throw new Error(response.data.Message || 'Upload failed');
        }
      } catch (error) {
        console.error('Upload failed:', error);
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            setError(`Upload failed: ${error.response.data.message || error.response.statusText}`);
          } else if (error.request) {
            console.error('No response received:', error.request);
            setError('Upload failed: No response received from server');
          } else {
            console.error('Error setting up request:', error.message);
            setError(`Upload failed: ${error.message}`);
          }
        } else {
          console.error('Non-Axios error:', error);
          setError(`Upload failed: ${error.message}`);
        }
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setDescription('');
    setError('');
  };

  const handleUploadSuccess = (responseData: Transcript) => {
    console.log('Upload response:', responseData);
    
    if (responseData && responseData.transcript_id) {
      console.log('New transcript ID:', responseData.transcript_id);
      onUploadSuccess(responseData);
    } else {
      console.error('New transcript is missing or has no transcript_id', responseData);
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
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#151517] text-white border border-[#383f45] focus:outline-none focus:border-[#596066]"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 text-sm text-[#fafafa]
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-[#fff500] file:text-black
                hover:file:bg-white"
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
                disabled={isUploading}
                className="px-4 py-2 text-sm font-medium text-black bg-[#fff500] rounded-lg hover:bg-white transition-colors"
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UploadTranscriptModal;