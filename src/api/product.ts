/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../interface/product";
const productApi = createApi({
  reducerPath: "products",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_API,
    prepareHeaders: (headers) => {
      const user = localStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : {};
      const access_token = parsedUser.user ? parsedUser.user.access_token : "";
      if (access_token) {
        headers.set("Authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<{ data: any; meta: any }, void>({
      query: () => "product/list-product",
      providesTags: ["Product"],
    }),
    getProductsCombo: builder.query<{ data: any; meta: any }, any>({
      query: (id) => `table/menu-table/${id}`,
      providesTags: ["Product"],
    }),
    searchProductByName: builder.query<{ data: any; meta: any }, string>({
      query: (name) => `product/list-product?name=${name}`,
      providesTags: ["Product"],
    }),
    getProductById: builder.query<IProduct, string | number>({
      query: (id) => `product/show-product/${id}`,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "product/create-product",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<IProduct, string | number>({
      query: (id) => ({
        url: `product/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<{ meta: { message: string } }, IProduct>({
      query: (product) => ({
        url: `product/update-product/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    paginateTable: builder.mutation<any, string>({
      query: (page) => ({
        url: `/product/list-product?page=${page}`,
        method: "GET",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSearchProductByNameQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductsComboQuery,
  usePaginateTableMutation,
} = productApi;
export const productReducer = productApi.reducer;
export default productApi;
