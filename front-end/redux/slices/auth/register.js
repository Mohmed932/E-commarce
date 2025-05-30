import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async thunk for register
export const handleregister = createAsyncThunk(
  "register/handleregister",
  async (data, thunkAPI) => {
    try {
      const req = await fetch("http://localhost:5000/api/v1/auth/create_account", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data), // use actual form data from user
      });
      const res = await req.json();

      if (!req.ok) {
        return thunkAPI.rejectWithValue(res); // reject with error message from server
      }
      console.log("Register success:", res);
      return res;
    } catch (error) {
      console.log("Network error:", error);
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

// Initial state
const initialState = {
  newUser: null,
  loading: false,
  error: null,
};

// Slice
const Authregister = createSlice({
  name: "register",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleregister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleregister.fulfilled, (state, action) => {
        state.loading = false;
        state.newUser = action.payload;
      })
      .addCase(handleregister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default Authregister.reducer;
