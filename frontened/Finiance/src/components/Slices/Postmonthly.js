import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GlobalUrl } from "../../GlobalUrl";

export const createBudget = createAsyncThunk(
  'monthly/createBudget',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${GlobalUrl}/createbudget`, formData);
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
  extraReducers: (builder) => {
    builder
      .addCase(createBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create budget";
      });
  },
});

export const { setbudget, clearBudget } = Postmontly.actions;
export default Postmontly.reducer;
