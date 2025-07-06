import { configureStore} from '@reduxjs/toolkit'
import posttranaction from '../Slices/postdataslice'

const Store = configureStore({
    reducer:{  user : posttranaction  }
})

export default Store
