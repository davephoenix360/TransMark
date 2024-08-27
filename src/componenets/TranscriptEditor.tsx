import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Make sure axios is imported

interface TranscriptEditorProps {
  isOpen: boolean;
  onClose: () => void;
  transcript: {
    id?: string;
    title: string;
    content: string;
  };
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
  onDeleteComment: (commentId: string) => void;
}

interface DialogueLine {
  id: string;
  speaker: string;
  text: string;
}

interface Comment {
  id: string;
  text: string;
  lineId: string;
  selectedText?: string;
  parentCommentId?: string;
}

const CommentComponent: React.FC<{ 
  comment: Comment; 
  onDelete: (id: string) => void;
  onReply: (parentCommentId: string) => void;
}> = ({ comment, onDelete, onReply }) => (
  <div className="bg-[#2a2d3a] p-2 rounded mt-2">
    {comment.selectedText && (
      <p className="text-gray-400 text-sm italic mb-1">"{comment.selectedText}"</p>
    )}
    <p className="text-white">{comment.text}</p>
    <div className="flex justify-between mt-1">
      <button onClick={() => onReply(comment.id)} className="text-blue-400 text-sm">Reply</button>
      <button onClick={() => onDelete(comment.id)} className="text-red-400 text-sm">Delete</button>
    </div>
  </div>
);

const API_URL = 'https://pde9nag7w2.execute-api.us-east-2.amazonaws.com/Dev1'; // Replace with your actual API URL

const addComment = async (commentData: {
  transcript_id: string;
  line_id: string;
  text: string;
  selected_text?: string;
  parent_comment_id?: string;
}) => {
  if (!commentData.transcript_id) {
    console.error('Cannot add comment: transcript_id is missing');
    throw new Error('transcript_id is required');
  }
  try {
    console.log('Sending comment data:', commentData);
    const response = await axios.post(`${API_URL}/comments`, commentData);
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    if (error.response) {
      console.error('Server error response:', error.response.data);
    }
    throw error;
  }
};

const fetchComments = async (transcriptId: string | undefined) => {
  if (!transcriptId) {
    console.error('Transcript ID is undefined');
    return [];
  }
  try {
    const response = await axios.get(`${API_URL}/comments?transcript_id=${transcriptId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

const deleteComment = async (commentId: string, transcriptId: string) => {
  try {
    await axios.delete(`${API_URL}/comments?comment_id=${commentId}&transcript_id=${transcriptId}`);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

const TranscriptEditor: React.FC<TranscriptEditorProps> = ({ 
  isOpen, 
  onClose, 
  transcript, 
  comments: initialComments = [], 
  onAddComment, 
  onDeleteComment 
}) => {
  const [dialogueLines, setDialogueLines] = useState<DialogueLine[]>([]);
  const [isFullTranscriptVisible, setIsFullTranscriptVisible] = useState(false);
  const [selectedText, setSelectedText] = useState<{ lineId: string; text: string } | null>(null);
  const [newComment, setNewComment] = useState('');
  const [activeCommentLineId, setActiveCommentLineId] = useState<string | null>(null);
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [transcriptId, setTranscriptId] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log('Transcript prop:', transcript);
    if (transcript) {
      const id = transcript.id || generateUniqueId(); // Use a fallback if id is not present
      console.log('Setting transcriptId:', id);
      setTranscriptId(id);
      fetchComments(id).then(fetchedComments => {
        setComments(fetchedComments);
      });
    } else {
      console.log('Transcript is undefined');
    }
  }, [transcript]);

  useEffect(() => {
    if (transcript && transcript.content) {
      const lines = transcript.content.split('\n').filter(line => line.trim() !== '');
      const parsedLines: DialogueLine[] = [];
      let currentSpeaker = '';
      let currentText = '';

      lines.forEach((line, index) => {
        if (line.includes(':')) {
          if (currentSpeaker && currentText) {
            parsedLines.push({
              id: `line-${parsedLines.length}`,
              speaker: currentSpeaker,
              text: currentText.trim()
            });
          }
          [currentSpeaker, currentText] = line.split(':');
        } else {
          currentText += ' ' + line;
        }
      });

      if (currentSpeaker && currentText) {
        parsedLines.push({
          id: `line-${parsedLines.length}`,
          speaker: currentSpeaker,
          text: currentText.trim()
        });
      }

      setDialogueLines(parsedLines);
    }
  }, [transcript]);

  const handleTextSelection = (lineId: string) => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== '') {
      setSelectedText({ lineId, text: selection.toString() });
    } else {
      setSelectedText(null);
    }
  };

  const handleAddComment = async (lineId: string) => {
    console.log('Current transcriptId:', transcriptId);
    console.log('Current transcript:', transcript);
    
    const currentTranscriptId = transcriptId || (transcript && (transcript.id || generateUniqueId()));
    
    if (newComment.trim() !== '' && currentTranscriptId) {
      const commentData = {
        transcript_id: currentTranscriptId,
        line_id: lineId,
        text: newComment,
        selected_text: selectedText?.lineId === lineId ? selectedText.text : undefined,
        parent_comment_id: replyingToCommentId || undefined,
      };
      console.log('Sending comment data:', commentData);
      try {
        const newCommentData = await addComment(commentData);
        console.log('New comment data:', newCommentData);
        const newCommentWithId = { ...commentData, id: newCommentData.comment_id };
        setComments(prevComments => [...prevComments, newCommentWithId]);
        onAddComment(newCommentWithId);
        setNewComment('');
        setActiveCommentLineId(null);
        setSelectedText(null);
        setReplyingToCommentId(null);
      } catch (error) {
        console.error('Failed to add comment:', error);
        // Handle error (e.g., show error message to user)
      }
    } else {
      console.error('Cannot add comment: transcript_id is undefined');
      // Handle error (e.g., show error message to user)
    }
  };

  const handleCancelComment = () => {
    setNewComment('');
    setActiveCommentLineId(null);
    setSelectedText(null);
    setReplyingToCommentId(null);
  };

  const handleReplyToComment = (parentCommentId: string) => {
    setReplyingToCommentId(parentCommentId);
    setActiveCommentLineId(comments.find(c => c.id === parentCommentId)?.lineId || null);
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId, transcript.id || '');
      setComments(comments.filter(comment => comment.id !== commentId));
      onDeleteComment(commentId);
    } catch (error) {
      console.error('Failed to delete comment:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  if (!isOpen || !transcript) return null;

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
          <div className="mb-6">
            <button
              className="bg-[#222530] text-white p-2 rounded-lg w-full text-left"
              onClick={() => setIsFullTranscriptVisible(!isFullTranscriptVisible)}
            >
              {isFullTranscriptVisible ? 'Hide' : 'Show'} Full Transcript
            </button>
            {isFullTranscriptVisible && (
              <div className="mt-2 bg-[#222530] p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">Transcript Content</h3>
                <pre className="text-gray-300 whitespace-pre-wrap">{transcript.content}</pre>
              </div>
            )}
          </div>
          {dialogueLines.map((line) => (
            <div 
              key={line.id} 
              className="mb-6 bg-[#222530] p-4 rounded-lg relative" 
              data-line-id={line.id}
              onMouseUp={() => handleTextSelection(line.id)}
            >
              <div className="flex items-start mb-2">
                <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
                <div className="ml-3 flex-grow">
                  <span className="font-semibold text-white">{line.speaker}</span>
                  <p className="text-gray-300 mt-1">{line.text}</p>
                </div>
              </div>
              <div className="mt-2 ml-11 flex items-center">
                <button 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm mr-2"
                  onClick={() => setActiveCommentLineId(activeCommentLineId === line.id ? null : line.id)}
                >
                  Reply
                </button>
                {selectedText && selectedText.lineId === line.id && (
                  <button 
                    className="text-green-400 hover:text-green-300 transition-colors duration-200 text-sm"
                    onClick={() => setActiveCommentLineId(line.id)}
                  >
                    Comment on Selection
                  </button>
                )}
              </div>
              {activeCommentLineId === line.id && (
                <div className="mt-2 ml-11">
                  {selectedText && selectedText.lineId === line.id && (
                    <p className="text-gray-400 text-sm italic mb-1">Commenting on: "{selectedText.text}"</p>
                  )}
                  {replyingToCommentId && (
                    <p className="text-gray-400 text-sm italic mb-1">Replying to comment</p>
                  )}
                  <textarea
                    className="w-full bg-[#2a2d3a] text-white p-2 rounded"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                  />
                  <div className="mt-2 flex justify-end">
                    <button 
                      className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
                      onClick={handleCancelComment}
                    >
                      Cancel
                    </button>
                    <button 
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => handleAddComment(line.id)}
                    >
                      Add Comment
                    </button>
                  </div>
                </div>
              )}
              {comments
                .filter(comment => comment.lineId === line.id && !comment.parentCommentId)
                .map(comment => (
                  <React.Fragment key={comment.id}>
                    <CommentComponent 
                      comment={comment} 
                      onDelete={handleDeleteComment}
                      onReply={handleReplyToComment}
                    />
                    {comments
                      .filter(reply => reply.parentCommentId === comment.id)
                      .map(reply => (
                        <div key={reply.id} className="ml-4 mt-2">
                          <CommentComponent 
                            comment={reply} 
                            onDelete={handleDeleteComment}
                            onReply={handleReplyToComment}
                          />
                        </div>
                      ))
                    }
                  </React.Fragment>
                ))
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to generate a unique id
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export default TranscriptEditor;