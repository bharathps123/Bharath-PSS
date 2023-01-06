import { configureStore } from '@reduxjs/toolkit';
import HeaderReducer from '../Components/features/HeaderSlice'
import InfoReducer from '../Components/features/InfoSlice'

export const store = configureStore({
  reducer: {
    header: HeaderReducer,
    info: InfoReducer,
  },
});
