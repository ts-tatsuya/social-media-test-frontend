import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/user/userSlice'
import postingSlice from '../features/posting/postingSlice'

export default configureStore({
    reducer: {
        user: userSlice,
        posting: postingSlice
    }
})  