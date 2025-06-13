// components/TutorDashboard.jsx
"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setConversations } from '@/store/slices/chatSlice';
import SocketContext from '@/services/socket';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatBox from '@/components/chat/ChatBox';

export default function TutorDashboard() {
  const dispatch = useDispatch();
  const [activeChat, setActiveChat] = React.useState(null);
  const ctx = React.useContext(SocketContext);
  const user = useSelector((state) => state.auth.user);
  const conversations = useSelector((state) => state.chatstore.conversations);

  React.useEffect(() => {
    if (user?.id) {
      ctx.sendCommand("get-conversations", { userId: user.id });
      
      const offConv = ctx.onEvent("conversations-list", data => {
        dispatch(setConversations(data));
      });
      
      // Listen for conversation updates (new messages, unread counts, etc.)
      const offUpdate = ctx.onEvent("conversation-updated", (updatedConversation) => {
        dispatch(setConversations(conversations.map(conv => 
          conv.id === updatedConversation.id ? updatedConversation : conv
        )));
      });
      
      return () => {
        offConv();
        offUpdate();
      };
    }
  }, [ctx, user, dispatch]);

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    
    // Mark messages as read when opening chat
    if (chat.unread > 0) {
      ctx.sendCommand("mark-as-read", { 
        conversationId: chat.id, 
        userId: user.id 
      });
    }
  };

  const handleCloseChat = () => {
    setActiveChat(null);
  };

  return (
    <div className="flex-1 overflow-y-auto rounded-xl bg-white shadow  " style={{ height: "80vh" }}>
      <div className="flex h-full">
        <ChatSidebar 
          onSelectChat={handleSelectChat}
        />
        
        {activeChat ? (
          <ChatBox 
            selectedChat={activeChat} 
            onClose={handleCloseChat} 
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center text-gray-500 max-w-md px-8">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Welcome to your messages
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Select a conversation from the sidebar to start messaging, or wait for new messages to arrive.
              </p>
              <div className="text-xs text-gray-400">
                {conversations.length > 0 
                  ? `${conversations.length} conversation${conversations.length !== 1 ? 's' : ''} available`
                  : 'No conversations yet'
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}