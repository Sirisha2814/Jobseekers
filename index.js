import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import applicationsReducer from '@/features/apply/applySlice'
 const store = configureStore({
  reducer: {
    auth: authReducer,
    applications: applicationsReducer, 
  },
})
export default store