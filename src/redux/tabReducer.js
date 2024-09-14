import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen : false
}

export const TabReducer = createSlice({
    name : "tab",
    initialState,
    reducers : {
        tabHandler : (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const {tabHandler} = TabReducer.actions
export default TabReducer.reducer