import React, { useState, useEffect, useRef } from 'react';

interface TranscriptEditorProps {
  isOpen: boolean;
  onClose: () => void;
  transcript: {
    id: string;
    title: string;
    content: string;
  } | null;
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

const TranscriptEditor: React.FC<TranscriptEditorProps> = ({ 
  isOpen, 
  onClose, 
  transcript, 
  comments = [], // Provide a default empty array
  onAddComment, 
  onDeleteComment 
}) => {
  const [dialogueLines, setDialogueLines] = useState<DialogueLine[]>([]);
  const [isFullTranscriptVisible, setIsFullTranscriptVisible] = useState(false);
  const [selectedText, setSelectedText] = useState<{ lineId: string; text: string } | null>(null);
  const [newComment, setNewComment] = useState('');
  const [activeCommentLineId, setActiveCommentLineId] = useState<string | null>(null);
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);

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

  const handleAddComment = (lineId: string) => {
    if (newComment.trim() !== '') {
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        text: newComment,
        lineId,
        selectedText: selectedText?.lineId === lineId ? selectedText.text : undefined,
        parentCommentId: replyingToCommentId || undefined,
      };
      onAddComment(comment);
      setNewComment('');
      setActiveCommentLineId(null);
      setSelectedText(null);
      setReplyingToCommentId(null);
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

  // Add this check at the beginning of the component
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
              {Array.isArray(comments) && comments
                .filter(comment => comment.lineId === line.id && !comment.parentCommentId)
                .map(comment => (
                  <React.Fragment key={comment.id}>
                    <CommentComponent 
                      comment={comment} 
                      onDelete={onDeleteComment}
                      onReply={handleReplyToComment}
                    />
                    {comments
                      .filter(reply => reply.parentCommentId === comment.id)
                      .map(reply => (
                        <div key={reply.id} className="ml-4 mt-2">
                          <CommentComponent 
                            comment={reply} 
                            onDelete={onDeleteComment}
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

export default TranscriptEditor;