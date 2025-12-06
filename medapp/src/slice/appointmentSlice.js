import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    loading: false,
    success: false,
    error: null,
    appointment: null,
  },

  reducers: {
    startBooking: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },

    bookingSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.appointment = action.payload;
    },

    bookingFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startBooking, bookingSuccess, bookingFail } = appointmentSlice.actions;
export default appointmentSlice.reducer;
