// components/ChatBox.jsx
"use client";
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Send, X, Image, Video, FileText, Calendar, Link, Plus } from 'lucide-react';
import SocketContext from '@/services/socket';
import { uploadFile } from '@/lib/firebaseUtils';

export default function ChatBox({ selectedChat, onClose }) {
  const user = useSelector(s => s.auth.user);
  const ctx = useContext(SocketContext);

  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  
  const fileRef = useRef();
  const messagesEndRef = useRef();
  const roomIdRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!user?.id || !selectedChat?.id) return;

    ctx.sendCommand("join-room", { from: user.id, to: selectedChat.peerId || selectedChat.id });

    const offHist = ctx.onEvent("chat-history", ({ roomId, messages }) => {
      roomIdRef.current = roomId;
      setMessages(messages);
    });
    
    const offNew = ctx.onEvent("new-message", msg => {
      setMessages(prev => [...prev, msg]);
    });
    
    return () => {
      offHist(); 
      offNew();
      if (roomIdRef.current) {
        ctx.sendCommand("leave-room", { roomId: roomIdRef.current });
      }
    };
  }, [ctx, user, selectedChat]);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
    
    const message = {
      from: user.id,
      to: selectedChat.peerId,
      type: 'message',
      content: messageInput.trim(),
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
        to: selectedChat.peerId,
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
      fileRef.current.click();
      fileRef.current.setAttribute('data-type', type);
    } else if (type === 'meetinglink') {
      handleSpecialMessage('meetinglink');
    } else if (type === 'schedule') {
      handleSpecialMessage('schedule');
    }
    setShowAttachmentMenu(false);
  };

  const handleSpecialMessage = (type) => {
    const message = {
      from: user.id,
      to: selectedChat.peerId,
      type: type,
      content: type === 'meetinglink' ? 'Meeting link created' : 'Schedule created',
      timestamp: new Date().toISOString()
    };
    ctx.sendCommand("send-message", message);
  };

  const renderMessage = (msg) => {
    switch (msg.type) {
      case 'message':
        return <p className="text-sm break-words whitespace-pre-wrap">{msg.content}</p>;
      
      case 'image':
        return (
          <div className="max-w-xs">
            <img 
              src={msg.content} 
              alt={msg.fileName || 'Image'} 
              className="rounded-lg max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.open(msg.content, '_blank')}
              style={{ maxHeight: '200px' }}
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
          <div className="flex items-center space-x-2 p-2 bg-opacity-20 bg-white rounded-lg border border-opacity-20 border-white">
            <FileText className="w-4 h-4 flex-shrink-0" />
            <a 
              href={msg.content} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm underline hover:no-underline truncate"
            >
              {msg.fileName || 'Download File'}
            </a>
          </div>
        );
      
      case 'meetinglink':
        return (
          <div className="flex items-center space-x-2 p-2 bg-opacity-20 bg-white rounded-lg border border-opacity-20 border-white">
            <Link className="w-4 h-4 flex-shrink-0" />
            <p className="text-sm">Meeting link shared</p>
          </div>
        );
      
      case 'schedule':
        return (
          <div className="flex items-center space-x-2 p-2 bg-opacity-20 bg-white rounded-lg border border-opacity-20 border-white">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <p className="text-sm">Schedule shared</p>
          </div>
        );
      
      default:
        return <p className="text-sm break-words">{msg.content}</p>;
    }
  };

  const attachmentOptions = [
    { type: 'image', icon: Image, label: 'Image', color: 'text-green-600' },
    { type: 'video', icon: Video, label: 'Video', color: 'text-red-600' },
    { type: 'material', icon: FileText, label: 'Document', color: 'text-blue-600' },
    { type: 'meetinglink', icon: Link, label: 'Meeting Link', color: 'text-purple-600' },
    { type: 'schedule', icon: Calendar, label: 'Schedule', color: 'text-orange-600' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* Header */}
      <div className="p-4 flex justify-between items-center  border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
              {selectedChat.avatar}
            </div>
            {selectedChat.online && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900">{selectedChat.name}</p>
            <p className="text-xs text-gray-500">
              {selectedChat.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <X 
          onClick={onClose} 
          className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
        />
      </div>

      {/* Messages */}
<div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ minHeight: 0 }}>
            {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="text-2xl">{selectedChat.avatar}</div>
              </div>
              <p className="font-medium text-gray-900">{selectedChat.name}</p>
              <p className="text-sm text-gray-500 mt-1">Start your conversation</p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end space-x-2 max-w-sm ${msg.sender_id === user.id ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                {msg.sender_id !== user.id && (
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs text-blue-600 font-medium flex-shrink-0">
                    {selectedChat.avatar}
                  </div>
                )}
                <div className={`px-4 py-2 rounded-2xl max-w-full ${
                  msg.sender_id === user.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {renderMessage(msg)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachment Menu */}
      {showAttachmentMenu && (
        <div className="absolute bottom-20 left-4 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
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
      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              disabled={uploading}
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
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={uploading ? "Uploading file..." : "Type a message..."}
            disabled={uploading}
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          
          <button 
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
            onClick={handleSendMessage}
            disabled={uploading || !messageInput.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}