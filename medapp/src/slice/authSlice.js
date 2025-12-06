import { createSlice, } from "@reduxjs/toolkit";
const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
     name: 'auth',
  initialState,
  reducers: { 
      loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
localStorage.setItem("user", JSON.stringify(action.payload.user));

    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
       localStorage.removeItem("user");
  localStorage.removeItem("token");
    },
      setUserImage: (state, action) => {
      if (state.user) {
        state.user.image = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
   }
})

export const { loginStart, loginSuccess, loginFailure, logout,setUserImage } = authSlice.actions;
export default authSlice.reducer;