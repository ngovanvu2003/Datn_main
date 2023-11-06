/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPaymentMethod } from "../interface/payment-method";

const paymentMethodApi = createApi({
  reducerPath: "payment-methods",
  tagTypes: ["PaymentMethod"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_API,
    // Set token vào header
    prepareHeaders: (headers) => {
      const user = localStorage.getItem("user");
      const { access_token = "" } = user ? JSON.parse(user) : {};
      if (access_token) {
        headers.set("Authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPaymentMethods: builder.query<{ meta: any; data: any }, void>({
      query: () => "payment-method/list-payment-method",
      providesTags: ["PaymentMethod"],
    }),
    getPaymentMethodById: builder.query<
      { meta: any; data: any },
      string | number
    >({
      query: (id) => `payment-method/show/${id}`,
      providesTags: ["PaymentMethod"],
    }),
    addPaymentMethod: builder.mutation<
      { meta: { message: string } },
      IPaymentMethod
    >({
      query: (branch) => ({
        url: "payment-method/create-payment-method",
        method: "POST",
        body: branch,
      }),
      invalidatesTags: ["PaymentMethod"],
    }),
    deletePaymentMethod: builder.mutation<
      { meta: { message: string } },
      string | number
    >({
      query: (id) => ({
        url: `payment-method/delete-payment-method/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PaymentMethod"],
    }),
    updatePaymentMethod: builder.mutation<
      { meta: { message: string } },
      string | number
    >({
      query: (id) => ({
        url: `payment-method/update-payment-method/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["PaymentMethod"],
    }),
  }),
});

export const {
  useGetPaymentMethodsQuery,
  useGetPaymentMethodByIdQuery,
  useAddPaymentMethodMutation,
  useDeletePaymentMethodMutation,
  useUpdatePaymentMethodMutation,
} = paymentMethodApi;
export const paymentMethodReducer = paymentMethodApi.reducer;
export default paymentMethodApi;
