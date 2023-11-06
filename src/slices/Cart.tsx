/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  items: [],
} as { items: any[] };

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<any>) => {
      const newProduct = action.payload;
      const existProductIndex = state.items.findIndex(
        (item: any) => item.id == newProduct.product_id
      );
      if (existProductIndex === -1) {
        state.items.push(newProduct);
      } else {
        state.items[existProductIndex].quantity++;
      }
    },
    increase: (state, action: PayloadAction<number>) => {
      state.items.find((item: any) => item.product_id === action.payload)
        .quantity++;
    },
    decrease: (state, action: PayloadAction<number>) => {
      const currentProduct = state.items.find(
        (item: any) => item.id === action.payload
      );
      currentProduct.quantity--;
      if (currentProduct.quantity < 1) {
        const confirm = window.confirm(
          "Số lượng không hợp lệ, bạn có muốn xoá?"
        );
        if (confirm)
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
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
    removeCarts: (state) => {
      state.items.map((item: any) => (item.quantity = []));
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});
export const { add, increase, decrease, remove, removeCarts, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
