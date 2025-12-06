import { createSlice } from '@reduxjs/toolkit';


const getAllDoctorSlice = createSlice({
      name: 'doctor',
  initialState: {
    doctors: [],
    loading: false,
  },
  reducers:{
    setDoctors : (state,action)=>{
           state.doctors = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  
})
export const { setDoctors, setLoading } = getAllDoctorSlice.actions;

export const getDoctorsData = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await fetch('http://localhost:4000/api/patient/doctorlist');
      const data = await res.json();

      if (data.success) {
        dispatch(setDoctors(data.data));
      } else {
        console.log(data.message);
      }

    } catch (error) {
      console.log("Error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};



export default getAllDoctorSlice.reducer;