import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        UserTransaction: {
            amount: '',
            date: '',
            description: '',
            category: ''
        },
        error: null
    },

    reducer: {
        setusertranaction: (state, action) => {
            state.UserTransaction = { ...state.UserTransaction, ...action.payload }
        },
        clearusertraction: (state, action) => {
            state.UserTransaction = {
                amount: '',
                date: '',
                description: '',
                category: ''
            }
        }
    }
   
})

export const {setusertranaction,clearusertraction } =UserSlice.actions // reducer funtion jo hmne likhe haa 
export default UserSlice.reducer 