
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './slices/auth/login'
import Authregister from './slices/auth/register'
import ActiveAccountSlice from './slices/auth/active_account'

const store = configureStore({
  reducer: {
    login: loginReducer,
    register:Authregister,
    active:ActiveAccountSlice
  },
});

export default store