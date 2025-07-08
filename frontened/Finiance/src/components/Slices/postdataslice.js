import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createtransaction = createAsyncThunk('user/createtransaction',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${GlobalUrl}/createtranaction`, formData)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    UserTransaction: {
      amount: '',
      date: '',
      description: '',
      category: ''
    },

  },

  reducers: {
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
    },

  }

})

export const { setusertranaction, clearusertraction } = UserSlice.actions // reducer funtion jo hmne likhe haa 
export default UserSlice.reducer 