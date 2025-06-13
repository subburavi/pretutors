// redux/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isChatOpen: false,
  conversations: [],
  mainselectedchat:null,
  selectedChat: null, // { id, name, avatar, online }
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    openChat(state, action) {
      state.isChatOpen = true;
      state.selectedChat = action.payload;
    },
    closeChat(state) {
      state.isChatOpen = false;
      state.mainselectedchat = null;
    },
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    selectChat(state, action) {
      state.mainselectedchat = action.payload;
      // mark as read
      state.conversations = state.conversations.map(c =>
        c.id === action.payload.id ? { ...c, unread: 0 } : c
      );
    },
    addMessageToConversation(state, action) {
      const { to, content, time } = action.payload;
      state.conversations = state.conversations.map(c =>
        c.id === to ? { ...c, lastMessage: content, time, unread: c.unread + 1 } : c
      );
    }
  }
});

export const { openChat, closeChat,setConversations,selectChat,addMessageToConversation } = chatSlice.actions;
export default chatSlice.reducer;
