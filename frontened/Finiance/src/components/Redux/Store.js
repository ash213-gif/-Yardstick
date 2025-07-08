import { configureStore } from '@reduxjs/toolkit'
import posttranaction from '../Slices/postdataslice'
import monthlyReducer from '../Slices/Postmonthly'
import getdata from '../Slices/getdata'

const Store = configureStore({
    reducer: {
        user: posttranaction,
        monthly: monthlyReducer,
        get:getdata,
    },
})

export default Store
