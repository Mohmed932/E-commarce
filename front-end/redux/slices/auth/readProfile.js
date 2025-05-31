import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Async thunk for reading profile
export const readProfile = createAsyncThunk(
  "auth/readProfile",
  async (_, thunkAPI) => {
    try {
      const req = await fetch("http://localhost:5000/api/v1/auth/profile", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const res = await req.json();

      if (!req.ok) {
        return thunkAPI.rejectWithValue(res); // reject with error message from server
      }

      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ message: "Network error" });
    }
  }
);

// Initial state
const initialState = {
  profile: null,
  profileloading: false,
  profilError: null,
};

// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(readProfile.pending, (state) => {
        state.profileloading = true;
        state.profilError = null;
      })
      .addCase(readProfile.fulfilled, (state, action) => {
        state.profileloading = false;
        state.profile = action.payload;
      })
      .addCase(readProfile.rejected, (state, action) => {
        state.profileloading = false;
        state.profilError = action.payload;
      });
  },
});

export default profileSlice.reducer;
