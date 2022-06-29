import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: { roomId: null },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

// Actions
export const { enterRoom } = appSlice.actions;

// Getter
export const selectRoomId = state => state.app.roomId;

// Whole reducer
export default appSlice.reducer;