/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderDetailApi = createApi({
  reducerPath: "order-details",
  tagTypes: ["OrderDetail"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_API,
    // Set token vào header
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage?.getItem("user") as string);
      const access_token = user?.user?.access_token;
      if (access_token) {
        headers.set("Authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrderDetailsOption: builder.query<{ meta: any; data: any }, string>({
      query: (string) => `order-detail/list${string}`,
      providesTags: ["OrderDetail"],
    }),
    getExportOrderDetails: builder.query<{ meta: any; data: any }, void>({
      query: () => "orderdetail/list-export-orderdetail",
      providesTags: ["OrderDetail"],
    }),
    getOrderDetailById: builder.query<
      { meta: any; data: any },
      string | number
    >({
      query: (id) => `order-detail/show-order-detail/${id}`,
      providesTags: ["OrderDetail"],
    }),
    addOrderDetail: builder.mutation<
      { meta: { message: string }; data: any },
      any
    >({
      query: (orderDetail) => ({
        url: "order-detail/store",
        method: "POST",
        body: orderDetail,
      }),
      invalidatesTags: ["OrderDetail"],
    }),
    updateOrderDetail: builder.mutation<{ meta: { message: string } }, any>({
      query: (orderDetail) => ({
        url: `order-detail/update/${orderDetail.id}`,
        method: "PUT",
        body: orderDetail,
      }),
      invalidatesTags: ["OrderDetail"],
    }),
    getOrderDetails: builder.query<{ meta: any; data: any }, number>({
      query: () => `order-detail/list`,
      providesTags: ["OrderDetail"],
    }),
    getOrderDetailsHistrory: builder.query<{ meta: any; data: any }, number>({
      query: (perpage) => `order-detail/list?perpage=${perpage | 200}`,
      providesTags: ["OrderDetail"],
    }),
  }),
});

export const {
  useGetOrderDetailsQuery,
  useGetOrderDetailsOptionQuery,
  useGetOrderDetailByIdQuery,
  useAddOrderDetailMutation,
  useUpdateOrderDetailMutation,
  useGetOrderDetailsHistroryQuery
} = orderDetailApi;
export const orderDetailReducer = orderDetailApi.reducer;
export default orderDetailApi;
