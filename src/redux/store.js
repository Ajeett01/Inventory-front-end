import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../redux/features/product/productSlice"
import filterReducer from "../redux/features/product/filterSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    filter: filterReducer,
  },
});
