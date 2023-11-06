import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orders",
  tagTypes: ["Order"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_API,
    // Set token vào header
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
    getOrders: builder.query<{ meta: any; data: any }, void>({
      query: () => "order/list",
      providesTags: ["Order"],
    }),
    getOrdersOption: builder.query<{ meta: any; data: any }, string>({
      query: (string) => `order/list${string}`,
      providesTags: ["Order"],
    }),
    getExportOrders: builder.query<{ meta: any; data: any }, void>({
      query: () => "order/list-export-order",
      providesTags: ["Order"],
    }),
    addOrder: builder.mutation<{ meta: { message: string }; data: any }, any>({
      query: (branch) => ({
        url: "order/store",
        method: "POST",
        body: branch,
      }),
      invalidatesTags: ["Order"],
    }),
    getOrderById: builder.query<
      { meta: { message: string }; data: any },
      string | number
    >({
      query: (id) => `order/invoice/${id}`,
      providesTags: ["Order"],
    }),
    deleteOrder: builder.mutation<
      { meta: { message: string } },
      string | number
    >({
      query: (id) => ({
        url: `order/delete-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrder: builder.mutation<{ meta: { message: string } }, any>({
      query: (order) => ({
        url: `order/update/${order.id}`,
        method: "PUT",
        body: order,
      }),
      invalidatesTags: ["Order"], 
    }),
    getCoupon: builder.query<{ meta: { message: string } }, void>({
      query: () => "coupon/list-coupon",
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrdersOptionQuery,
  useAddOrderMutation,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useGetCouponQuery,
} = orderApi;
export const orderReducer = orderApi.reducer;
export default orderApi;
