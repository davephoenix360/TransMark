import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { formatDateTime } from '../utils/dateUtils';

interface UploadTranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (transcript: any) => void;
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

    const createdDate = new Date(file.lastModified);
    const uploadDate = new Date();
    const { formattedDate: createdFormattedDate, formattedTime: createdFormattedTime } = formatDateTime(createdDate);
    const { formattedDate: uploadFormattedDate, formattedTime: uploadFormattedTime } = formatDateTime(uploadDate);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('createdDate', createdFormattedDate);
    formData.append('createdTime', createdFormattedTime);
    formData.append('uploadDate', uploadFormattedDate);
    formData.append('uploadTime', uploadFormattedTime);

    try {
      const response = await axios.post('/api/upload-transcript', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      if (response.data.success) {
        console.log('Upload successful:', response.data);
        onUploadSuccess(response.data.transcript);
        resetForm();
        onClose();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setDescription('');
    setError('');
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