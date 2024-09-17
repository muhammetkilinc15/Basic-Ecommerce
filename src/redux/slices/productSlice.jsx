import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    products: [],
    selectedProduct: {},
    loading: false
}

const BASE_URL = "https://fakestoreapi.com";

// tüm ürünleri getiren metot
export const getProducts = createAsyncThunk("getProducts", async () => {
    const response = await axios.get(`${BASE_URL}/products`)
    return response.data;
})



export const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        
            setSelectedProduct : (state,action)=>{
                state.selectedProduct= action.payload
            }
    }, extraReducers: (builder) => {
        builder.addCase(getProducts.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.products = action.payload
        })
    }
})

export const { setSelectedProduct} = productSlice.actions;
export default productSlice.reducer