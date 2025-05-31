import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async thunk for sending email for forget password
export const sendEmailForgetPassword = createAsyncThunk(
  "auth/sendEmailForgetPassword",
  async (email, thunkAPI) => {
    try {
      const req = await fetch(`http://localhost:5000/api/v1/auth/forget_password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const res = await req.json();

      if (!req.ok) {
        return thunkAPI.rejectWithValue(res);
      }

      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

// Async thunk for checking the link for resetting password
export const handlecheckLink = createAsyncThunk(
  "auth/handlecheckLink",
  async (data, thunkAPI) => {
    try {
      const req = await fetch(`http://localhost:5000/api/v1/auth/account_id/${data.id}/check_link/${data.token}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await req.json();

      if (!req.ok) {
        return thunkAPI.rejectWithValue(res); // استرجاع رسالة الخطأ من السيرفر
      }

      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

// Async thunk for resetting password
export const handleResetPassword = createAsyncThunk(
  "auth/handleResetPassword",
  async (data, thunkAPI) => {
    try {
      const req = await fetch(`http://localhost:5000/api/v1/auth/account_id/${data.id}/reset_password/${data.token}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.values),
      });

      const res = await req.json();

      if (!req.ok) {
        return thunkAPI.rejectWithValue(res); // استرجاع رسالة الخطأ من السيرفر
      }
      return res;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

// الحالة الابتدائية
const initialState = {
  // حالات handleResetPassword
  success: null,
  loading: false,
  error: null,
  // حالات handlecheckLink
  checkLinkLoading: false,
  checkLinkError: null,
  checkLinkSuccess: null,
  // حالات sendEmailForgetPassword
  sendEmailLoading: false,
  sendEmailError: null,
  sendEmailSuccess: null,
};

// Slice
const ResetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(handleResetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || "Password reset successful.";
      })
      .addCase(handleResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to reset password.";
      })
      

      // حالات handlecheckLink
      .addCase(handlecheckLink.pending, (state) => {
        state.checkLinkLoading = true;
        state.checkLinkError = null;
        state.checkLinkSuccess = null;
      })
      .addCase(handlecheckLink.fulfilled, (state, action) => {
        state.checkLinkLoading = false;
        state.checkLinkSuccess = action.payload;
        state.checkLinkError = null;
      })
      .addCase(handlecheckLink.rejected, (state, action) => {
        state.checkLinkLoading = false;
        state.checkLinkError = action.payload?.message || action.error?.message || "Failed to check link.";
        state.checkLinkSuccess = null;
      })
      // حالات sendEmailForgetPassword
      .addCase(sendEmailForgetPassword.pending, (state) => {
        state.sendEmailLoading = true;
        state.sendEmailError = null;
        state.sendEmailSuccess = null;
      })
      .addCase(sendEmailForgetPassword.fulfilled, (state, action) => {
        state.sendEmailLoading = false;
        state.sendEmailSuccess = action.payload.message || "Email sent successfully.";
      })
      .addCase(sendEmailForgetPassword.rejected, (state, action) => {
        state.sendEmailLoading = false;
        state.sendEmailError = action.payload?.message || action.error?.message || "Failed to send email.";
      });
  },
});

export default ResetPasswordSlice.reducer;
