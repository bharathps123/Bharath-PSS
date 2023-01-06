import { createSlice } from '@reduxjs/toolkit';

export const HeaderSlice = createSlice({
  name: 'header',
  initialState: {
      header: null,
  },
  reducers: {
    showing: (state, action) => {
      state.header = action.payload;
    },
    hiding: (state) => {
      state.header = true;
    },
  },

});

export const { showing, hiding } = HeaderSlice.actions;

export const selectHeader = (state) => state.header.header;

export default HeaderSlice.reducer;