// components/FloatingChatBox.jsx
"use client";
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Send, Paperclip, X, Image, Video, FileText, Calendar, Link, Plus } from 'lucide-react';
import { closeChat } from '@/store/slices/chatSlice';
import SocketContext from '@/services/socket';
import { uploadFile } from '@/lib/firebaseUtils';

const FloatingChatBox = () => {
  const dispatch = useDispatch();
  const { isChatOpen, selectedChat } = useSelector((state) => state.chatstore);
  const user = useSelector((state) => state.auth.user);
  const ctx = useContext(SocketContext);

  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  
  const fileRef = useRef();
  const messagesEndRef = useRef();
  const roomId = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!user?.id || !selectedChat?.id) return;
    const from = user.id;
    const to = selectedChat.id;

    ctx.sendCommand("join-room", { from, to });

    ctx.onEvent("chat-history", ({ roomId: rid, messages }) => {
      roomId.current = rid;
      setMessages(messages);
    });

    ctx.onEvent("new-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      ctx.offEvent("chat-history");
      ctx.offEvent("new-message");
    };
  }, [ctx, user, selectedChat]);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
    const message = {
      from: user.id,
      to: selectedChat.id,
      type: 'message',
      content: messageInput,
    };
    ctx.sendCommand("send-message", message);
    setMessageInput('');
  };

  const handleFileUpload = async (e, type = null) => {
    const file = e.target.files[0];
    if (!file) return;
    
    let messageType = type;
    if (!messageType) {
      const ext = file.name.split('.').pop().toLowerCase();
      messageType = ext.match(/(jpg|jpeg|png|gif|webp|bmp)/) ? 'image' : 
                   ext.match(/(mp4|mkv|webm|avi|mov)/) ? 'video' : 'material';
    }
    
    setUploading(true);
    setShowAttachmentMenu(false);
    
    try {
      const path = `chat/${Date.now()}_${file.name}`;
      const { downloadURL } = await uploadFile(file, path);
      const message = {
        from: user.id,
        to: selectedChat.id,
        type: messageType,
        content: downloadURL,
        fileName: file.name
      };
      ctx.sendCommand("send-message", message);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleAttachmentClick = (type) => {
    if (['image', 'video', 'material'].includes(type)) {
      // Trigger file input for file selection
      fileRef.current.click();
      fileRef.current.setAttribute('data-type', type);
    } else if (type === 'meetinglink') {
      // Handle meeting link creation
      handleSpecialMessage('meetinglink');
    } else if (type === 'schedule') {
      // Handle schedule creation
      handleSpecialMessage('schedule');
    }
    setShowAttachmentMenu(false);
  };

  const handleSpecialMessage = (type) => {
    // This function can be customized based on your needs
    const message = {
      from: user.id,
      to: selectedChat.id,
      type: type,
      content: type === 'meetinglink' ? 'Meeting link created' : 'Schedule created',
      timestamp: new Date().toISOString()
    };
    ctx.sendCommand("send-message", message);
  };

  const renderMessage = (msg) => {
    switch (msg.type) {
      case 'message':
        return <p className="text-sm break-words">{msg.content}</p>;
      
      case 'image':
        return (
          <div className="max-w-xs">
            <img 
              src={msg.content} 
              alt={msg.fileName || 'Image'} 
              className="rounded-lg max-w-full h-auto cursor-pointer"
              onClick={() => window.open(msg.content, '_blank')}
            />
            {msg.fileName && <p className="text-xs mt-1 opacity-75">{msg.fileName}</p>}
          </div>
        );
      
      case 'video':
        return (
          <div className="max-w-xs">
            <video 
              src={msg.content} 
              controls 
              className="rounded-lg max-w-full h-auto"
              style={{ maxHeight: '200px' }}
            />
            {msg.fileName && <p className="text-xs mt-1 opacity-75">{msg.fileName}</p>}
          </div>
        );
      
      case 'material':
        return (
          <div className="flex items-center space-x-2 p-2 bg-opacity-20 bg-white rounded">
            <FileText className="w-4 h-4" />
            <a 
              href={msg.content} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm underline hover:no-underline"
            >
              {msg.fileName || 'Download File'}
            </a>
          </div>
        );
      
      case 'meetinglink':
        return (
          <div className="flex items-center space-x-2 p-2 bg-opacity-20 bg-white rounded">
            <Link className="w-4 h-4" />
            <p className="text-sm">Meeting link shared</p>
          </div>
        );
      
      case 'schedule':
        return (
          <div className="flex items-center space-x-2 p-2 bg-opacity-20 bg-white rounded">
            <Calendar className="w-4 h-4" />
            <p className="text-sm">Schedule shared</p>
          </div>
        );
      
      default:
        return <p className="text-sm">{msg.content}</p>;
    }
  };

  const attachmentOptions = [
    { type: 'image', icon: Image, label: 'Image', color: 'text-green-600' },
    { type: 'video', icon: Video, label: 'Video', color: 'text-red-600' },
    { type: 'material', icon: FileText, label: 'Document', color: 'text-blue-600' },
    { type: 'meetinglink', icon: Link, label: 'Meeting Link', color: 'text-purple-600' },
    { type: 'schedule', icon: Calendar, label: 'Schedule', color: 'text-orange-600' },
  ];

  if (!isChatOpen || !selectedChat) return null;

  return (
    <div style={{border:"2px solid #4e53fb"}} className="fixed bottom-4 right-4 w-96 max-w-full bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
            {selectedChat.avatar}
          </div>
          <div>
            <p className="font-medium text-gray-900">{selectedChat.name}</p>
            <p className="text-xs text-gray-500">{selectedChat.online ? "Online" : "Offline"}</p>
          </div>
        </div>
        <X className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => dispatch(closeChat())} />
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3" style={{ minHeight: '400px', maxHeight: '400px' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end space-x-2 max-w-xs ${msg.sender_id === user.id ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
              {msg.sender_id !== user.id && (
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-medium flex-shrink-0">
                  {selectedChat.avatar}
                </div>
              )}
              <div className={`px-4 py-2 rounded-2xl ${msg.sender_id === user.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} max-w-full`}>
                {renderMessage(msg)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachment Menu */}
      {showAttachmentMenu && (
        <div className="absolute bottom-16 left-3 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
          <div className="grid grid-cols-2 gap-2">
            {attachmentOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.type}
                  onClick={() => handleAttachmentClick(option.type)}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <IconComponent className={`w-6 h-6 ${option.color} mb-1`} />
                  <span className="text-xs text-gray-600">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              {showAttachmentMenu ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>
          
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              const type = e.target.getAttribute('data-type');
              handleFileUpload(e, type);
            }}
            accept={fileRef.current?.getAttribute('data-type') === 'image' ? 'image/*' : 
                   fileRef.current?.getAttribute('data-type') === 'video' ? 'video/*' : '*/*'}
          />
          
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder={uploading ? 'Uploading file...' : 'Type a message...'}
            disabled={uploading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button 
            onClick={handleSendMessage} 
            disabled={uploading || !messageInput.trim()}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingChatBox;