import { createSlice } from '@reduxjs/toolkit';

export const InfoSlice = createSlice({
  name: 'info',
  initialState: {
      info: null,
  },
  reducers: {
    save: (state, action) => {
      state.info = action.payload;
    },
    discard: (state) => {
      state.info = null;
    },
  },

});

export const { save, discard } = InfoSlice.actions;

export const selectUser = (state) => state.info.info;

export default InfoSlice.reducer;