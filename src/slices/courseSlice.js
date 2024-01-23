import { createSlice } from "@reduxjs/toolkit"


const initialState={
    step:1,
    course:null,
    editCourse:false,
    paymentLoading:false,
}

const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{
        setStep:(state,actions)=>{
            state.step=actions.payload
        },
        setCourse:(state,actions)=>{
            state.course=actions.payload
        },
        setEditCourse:(state,actions)=>{
            state.editCourse=actions.payload
        },
    
        setPaymentLoading:(state,actions)=>{
            state.paymentLoading=actions.payload
        },
        resetCourseState:(state)=>{
            state.step=1
            state.course=null
            state.editCourse=false
        },
    }
})

export const {setStep,setCourse, setEditCourse ,setPaymentLoading,resetCourseState}=courseSlice.actions
export default courseSlice.reducer;