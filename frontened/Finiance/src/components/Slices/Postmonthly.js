import { createSlice } from "@reduxjs/toolkit";

 const Postmontly= createSlice({
    name:'monthlyPost',
    initialState:{
        budget:{
            category:'',
            amount:'',
            
        }
    }
 })