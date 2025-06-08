import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk موحد لجلب الفئة حسب ID والنوع
export const collectSubCategory = createAsyncThunk(
  "subCategory/fetch",
  async ({ id, type }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/subcategory/${id}`);
      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue({ error: data, type });
      }

      return { data, type };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: { message: error.message }, type });
    }
  }
);

// الحالة الأولية
const initialState = {
  categories: {
    woman: null,
    man: null,
    boys: null,
    girls: null,
  },
  loading: false,
  error: null,
};

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(collectSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(collectSubCategory.fulfilled, (state, action) => {
        const { data, type } = action.payload;
        state.categories[type] = data;
        state.loading = false;
      })
      .addCase(collectSubCategory.rejected, (state, action) => {
        const { error, type } = action.payload;
        state.error = { [type]: error };
        state.loading = false;
      });
  },
});

export default subCategorySlice.reducer;
