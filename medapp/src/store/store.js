import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from '../slice/doctorSlice.js'
import authReducer from '../slice/authSlice.js'
import appointmentReducer from '../slice/appointmentSlice.js'

export const store = configureStore({
  reducer: {
    doctor: doctorReducer,
    auth: authReducer,
    appointment: appointmentReducer,
  },
});
