import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Async thunk for login
export const handlelogin = createAsyncThunk(
  "login/handlelogin",
  async (data, thunkAPI) => {
    try {
      const req = await fetch("http://localhost:5000/api/v1/auth/login_account", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      const res = await req.json();

      if (!req.ok) {
        return thunkAPI.rejectWithValue(res); // reject with error message from server
      }
      console.log(res)
      return res;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Slice
const Authlogin = createSlice({
  name: "login",
  initialState,
  //   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handlelogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handlelogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(handlelogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default Authlogin.reducer;
