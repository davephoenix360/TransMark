"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../componenets/Navbar";
import ChatbotWindow from "../../../componenets/ChatbotWindow";
import TranscriptEditor from "../../../componenets/TranscriptEditor";
import UploadTranscriptModal from "../../../componenets/UploadTranscriptModal";

interface Transcript {
  transcript_id: string;
  title: string;
  description: string;
  created_date: string;
  upload_date: string;
  file_url: string;
  content: string;
  lines?: Array<{
    id: string;
    text: string;
    speaker?: {
      name: string;
      isAgent?: boolean;
    };
    comments?: Array<{
      selection?: string;
      text: string;
    }>;
  }>;
}

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedTranscript, setSelectedTranscript] =
    useState<Transcript | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTranscripts();
  }, []);

  const fetchTranscripts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://pde9nag7w2.execute-api.us-east-2.amazonaws.com/Dev1/upload-transcript"
      );
      setTranscripts(response.data);
    } catch (err) {
      console.error("Failed to fetch transcripts:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(
          `Failed to load transcripts. Server responded with: ${
            err.response.status
          } ${err.response.statusText}. ${err.response.data.message || ""}`
        );
      } else {
        setError("Failed to load transcripts. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadSuccess = (newTranscript: Transcript) => {
    setTranscripts((prevTranscripts) => [newTranscript, ...prevTranscripts]);
    setIsUploadModalOpen(false);
  };

  const deleteAllTranscripts = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete all transcripts? This action cannot be undone."
      )
    ) {
      try {
        await axios.delete(
          "https://pde9nag7w2.execute-api.us-east-2.amazonaws.com/Dev1/upload-transcript"
        );
        // Refresh the transcripts list
        fetchTranscripts();
      } catch (error) {
        console.error("Error deleting all transcripts:", error);
        if (axios.isAxiosError(error) && error.response) {
          setError(
            `Failed to delete transcripts. Server error: ${
              error.response.data.message || error.message
            }`
          );
        } else {
          setError("Failed to delete transcripts. Please try again.");
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#03050c] min-h-screen text-[#fafafa] pt-12 px-4 sm:px-6">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-6 mt-6">
          Transcripts
        </h1>

        {/* Search, Filter, and Upload Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[#03050c] sticky top-12 z-10 mt-6">
          <input
            type="text"
            placeholder="Search transcripts..."
            className="w-full sm:w-2/3 p-3 rounded-lg bg-[#151517] text-white border border-[#383f45] focus:outline-none focus:border-[#596066] mb-4 sm:mb-0"
          />
          <div className="w-full sm:w-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              className="btn-primary w-full sm:w-auto"
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload Transcript
            </button>
            <button className="btn-danger ml-4" onClick={deleteAllTranscripts}>
              Delete All Transcripts
            </button>
            <div
              className={`flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 ${
                isFilterOpen ? "block" : "hidden sm:flex"
              }`}
            >
              <button className="btn-primary w-full sm:w-auto">
                Filter by Date
              </button>
              <button className="btn-primary w-full sm:w-auto">
                Filter by Agent
              </button>
              <button className="btn-primary w-full sm:w-auto">
                Filter by Tag
              </button>
            </div>
          </div>
        </div>

        {/* Transcript Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-6">
          {transcripts.map((transcript, index) => {
            console.log(`Rendering transcript ${index}:`, transcript);
            return (
              <div
                key={transcript.transcript_id || `fallback-${index}`}
                className="bg-[#191b22] p-6 rounded-lg shadow-md hover:border-[#383f45] border border-transparent transition-colors flex flex-col justify-between"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {transcript.title}
                </h3>
                <p>
                  Transcript ID: {transcript.transcript_id || "Not available"}
                </p>
                <div className="text-[#9ea5ad] mb-4">
                  <p>
                    <span className="font-bold text-[#ced2d6]">Created:</span>{" "}
                    {transcript.created_date}
                  </p>
                  <p>
                    <span className="font-bold text-[#ced2d6]">Uploaded:</span>{" "}
                    {transcript.upload_date}
                  </p>
                  <p className="mt-2">{transcript.description}</p>
                </div>
                {transcript.file_url && (
                  <a
                    href={transcript.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View File
                  </a>
                )}
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    className="p-2 rounded-full bg-[#fff500] hover:bg-white transition-colors duration-300 group relative"
                    onClick={() => {
                      setSelectedTranscript(transcript);
                      setIsEditorOpen(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Comment
                    </span>
                  </button>
                  <button className="p-2 rounded-full bg-[#fff500] hover:bg-white transition-colors duration-300 group relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Summary
                    </span>
                  </button>
                  <button
                    className="p-2 rounded-full bg-[#fff500] hover:bg-white transition-colors duration-300 group relative"
                    onClick={() => {
                      setSelectedTranscript(transcript);
                      setIsChatbotOpen(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Open Chatbot
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ChatbotWindow
        transcript={selectedTranscript}
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
      <TranscriptEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        transcript={
          selectedTranscript
            ? {
                title: selectedTranscript.title,
                content: selectedTranscript.content,
              }
            : null
        }
      />
      <UploadTranscriptModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </>
  );
}
