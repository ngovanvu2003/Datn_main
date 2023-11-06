/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../interface/product";

const initialState = {
  items: [],
} as { items: any[] };

const cartPosSlice = createSlice({
  name: "cartsPos",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IProduct>) => {
      const newProduct = action.payload;
      const existProductIndex = state.items.findIndex(
        (item: any) => item.id == newProduct.id
      );
      if (existProductIndex === -1) {
        state.items.push(newProduct);
      } else {
        state.items[existProductIndex].quantity++;
      }
    },
    increase: (state, action: PayloadAction<string | number>) => {
      state.items.find((item: any) => item.id === action.payload).quantity++;
    },
    decrease: (state, action: PayloadAction<string | number>) => {
      const currentProduct = state.items.find(
        (item: any) => item.id === action.payload
      );
      currentProduct.quantity--;
      if (currentProduct.quantity < 1) {
        currentProduct.quantity = 1;
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      const currentProduct = state.items.find(
        (item: any) => item.id === action.payload
      );
      currentProduct.quantity = 0;
      if (currentProduct.quantity == 0) {
        state.items = state.items.filter(
          (item: any) => item.id !== action.payload
        );
      }
    },
    clear: (state) => {
      state.items.map((item: any) => (item.quantity = 0));
      state.items = state.items.filter((item: any) => item.quantity !== 0);
    },
  },
});
export const { add, increase, decrease, remove, clear } = cartPosSlice.actions;
export const cartPosReducer = cartPosSlice.reducer;
