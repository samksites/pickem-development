import { configureStore } from '@reduxjs/toolkit'
import uidSlice from './uidSlice'

export default configureStore({
  reducer: {
    uid: uidSlice
  }
})