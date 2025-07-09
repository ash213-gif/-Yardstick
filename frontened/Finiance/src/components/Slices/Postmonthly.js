import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalUrl } from "../../GlobalUrl";

export const createBudget = createAsyncThunk('monthly/createBudget',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${GlobalUrl}/CreateBudget`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const Postmontly = createSlice({
  name: "monthlyPost",
  initialState: {
    budget: {
      category: "",
      amount: "",
    },
    loading: false,
    error: null,
  },

  reducers: {
    setbudget: (state, action) => {
      state.budget = { ...state.budget, ...action.payload };
    },
    clearBudget: (state) => {
      state.budget = {
        category: "",
        amount: "",
      };
    },
  },
 
  
});

export const { setbudget, clearBudget } = Postmontly.actions;
export default Postmontly.reducer;
