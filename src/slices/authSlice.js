import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  signUpData:localStorage.getItem("signUpData") ? JSON.parse(localStorage.getItem("signUpData")) :null,
  loading:false,
  token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) :null,
};

const authSlice = createSlice({
  name: "auth",
  initialState:initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },
    setLoading(state, value) {
      state.loading= value.payload;
    },
    setSignupData(state, value) {
      state.signUpData= value.payload;
    },
  },
});

export const {setToken,setLoading,setSignupData} = authSlice.actions;
export default authSlice.reducer
