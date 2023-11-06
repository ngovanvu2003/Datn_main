/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IStock } from "../interface/stock";
const stockApi = createApi({
  reducerPath: "stocks",
  tagTypes: ["Stock"],
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
    getStocks: builder.query<{ data: any; meta: any }, void>({
      query: (stock) => ({
        url: `stocks`,
        method: "POST",
        body: stock,
      }),
    }),
    updateStock: builder.mutation<{ meta: { message: string } },IStock>({
      query: (stock) => ({
        url: `stocks/update`,
        method: "PUT",
        body:stock
        
      }),
      invalidatesTags: ["Stock"],
    }),
  }),
});

export const {
 useGetStocksQuery,
  useUpdateStockMutation
} = stockApi;
export const stockReducer = stockApi.reducer;
export default stockApi;
