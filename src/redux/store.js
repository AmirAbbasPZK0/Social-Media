import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userReducer'
import tabReducer from './tabReducer'


export const store = configureStore({
    reducer : {
        user : userReducer,
        tab : tabReducer
    }
})