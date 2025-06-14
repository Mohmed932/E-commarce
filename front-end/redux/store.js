
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './slices/auth/login'
import Authregister from './slices/auth/register'
import ActiveAccountSlice from './slices/auth/active_account'
import profileSlice from './slices/auth/readProfile'
import ResetPasswordSlice from './slices/auth/resetPassword'
import subCategorySlice from './slices/category/subCategory'
import productsSlice from './slices/product/read'

const store = configureStore({
  reducer: {
    login: loginReducer,
    register:Authregister,
    active:ActiveAccountSlice,
    profile: profileSlice,
    resetPassword: ResetPasswordSlice,
    subCategory: subCategorySlice,
    readproducts: productsSlice
  },
});

export default store