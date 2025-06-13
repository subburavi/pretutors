import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: null,
  userName: '',
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setRoomId, setUserName } = meetingSlice.actions;
export default meetingSlice.reducer;
