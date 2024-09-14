import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin : false
}


export const userReducer = createSlice({
    name : "user",
    initialState,
    reducers : {
        loginHandler : (state , action) => {
            state.isLogin = true
            state.data = action.payload
        }
    }
})

export const {loginHandler} = userReducer.actions
export default userReducer.reducer