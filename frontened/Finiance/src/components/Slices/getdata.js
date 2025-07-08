import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getdata: []
};

const getdataSlice = createSlice({
    name: 'getdata',
    initialState,
    reducers: {
        setgetdata: (state, action) => {
            state.getdata = action.payload;
        },
       
    }
});

export const { setgetdata  }= getdataSlice.actions
export default getdataSlice.reducer