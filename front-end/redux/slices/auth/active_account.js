import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async thunk for activating account
export const handleActiveAccount = createAsyncThunk(
  "activeAccount/handleActiveAccount",
  async (data, thunkAPI) => {
    try {
      const req = await fetch(`http://localhost:5000/api/v1/auth/account_id/${data.accountId}/active_account/${data.activeAccountId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const res = await req.json();

      if (!req.ok) {
        return thunkAPI.rejectWithValue(res); // Error from server
      }
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message || "An error occurred" });
    }
  }
);

// Initial state
const initialState = {
  activeAccount: null,
  loading: false,
  error: null,
};

// Slice
const ActiveAccountSlice = createSlice({
  name: "activeAccount",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleActiveAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleActiveAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.activeAccount = action.payload;
      })
      .addCase(handleActiveAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ActiveAccountSlice.reducer;
