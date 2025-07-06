import { combineReducers } from "@reduxjs/toolkit";


const rootreducer=combineReducers({
     counter: counterReducer,
  // other reducers
})

export default rootreducer;