import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk موحد لجلب المنتجات حسب ID الفئة والنوع
export const fetchProductsByCategory = createAsyncThunk(
    "products/fetchByCategory",
    async ({ id, type }, thunkAPI) => {
        try {
            const res = await fetch(`http://localhost:5000/api/v1/product/category/${id}`);
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
    products: {
        man: null,        
        woman: null,     
        boys: null,      
        girls: null,    
    },
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                const { data, type } = action.payload;
                state.products[type] = data;
                state.loading = false;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                const { error, type } = action.payload;
                state.error = { [type]: error };
                state.loading = false;
            });
    },
});

export default productsSlice.reducer;
