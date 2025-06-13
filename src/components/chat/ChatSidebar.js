// components/ChatSidebar.jsx
"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectChat } from '@/store/slices/chatSlice';
import { MessageCircle, Clock } from 'lucide-react';

const ChatSidebar = ({ onSelectChat }) => {
  const dispatch = useDispatch();
  const conversations = useSelector(s => s.chatstore.conversations);
  const selectedChat = useSelector(s => s.chatstore.selectedChat);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const handleChatSelect = (conversation) => {
    dispatch(selectChat(conversation));
    onSelectChat(conversation);
  };

  if (conversations.length === 0) {
    return (
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="font-semibold text-gray-900 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Chats
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs text-gray-400 mt-1">Start a new chat to begin</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/3 border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
        <h2 className="font-semibold text-gray-900 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Chats
          {conversations.length > 0 && (
            <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
              {conversations.length}
            </span>
          )}
        </h2>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => {
          const isSelected = selectedChat?.id === conversation.id;
          const hasUnread = conversation.unread > 0;
          
          return (
            <div
              key={conversation.id}
              className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors relative ${
                isSelected ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
              }`}
              onClick={() => handleChatSelect(conversation)}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-lg">
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium truncate ${hasUnread ? 'text-gray-900' : 'text-gray-700'}`}>
                      {conversation.name}
                    </h3>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className="text-xs text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTime(conversation.time || conversation.time)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate pr-2 ${hasUnread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                      {conversation.lastMessage || 'No messages yet'}
                    </p>
                    
                    {/* Unread Count */}
                    {hasUnread && (
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-xs font-medium rounded-full">
                          {conversation.unread > 99 ? '99+' : conversation.unread}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Message Type Indicator */}
                  {conversation.lastMessageType && conversation.lastMessageType !== 'message' && (
                    <div className="mt-1">
                      <span className="inline-flex items-center text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                        {conversation.lastMessageType === 'image' && '📷 Image'}
                        {conversation.lastMessageType === 'video' && '🎥 Video'}
                        {conversation.lastMessageType === 'material' && '📎 File'}
                        {conversation.lastMessageType === 'meetinglink' && '🔗 Meeting'}
                        {conversation.lastMessageType === 'schedule' && '📅 Schedule'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Typing Indicator */}
              {conversation.isTyping && (
                <div className="mt-2 ml-15">
                  <div className="flex items-center space-x-1 text-blue-500">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs">typing...</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;