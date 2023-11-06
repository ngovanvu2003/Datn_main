/* eslint-disable @typescript-eslint/ban-types */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const customerApi = createApi({
  reducerPath: "customer",
  tagTypes: ["Customer"],
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
    getAllCustomer: builder.query<{ meta: any; data: any }, void>({
      query: () => "user/list-customer",
      providesTags: ["Customer"],
    }),
    getAllAdministrators: builder.query<{ meta: any; data: any }, void>({
      query: () => "user/list-admin",
      providesTags: ["Customer"],
    }),
    getCustomerById: builder.query<{ meta: any; data: any }, void>({
      query: (id) => `user/show/${id}`,
      providesTags: ["Customer"],
    }),

    deleteCustomer: builder.mutation<{ meta: {}; data: {} }, any>({
      query: (customer) => ({
        url: "user/delete",
        method: "DELETE",
        body: {
          id: customer,
        },
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetAllCustomerQuery,
  useGetAllAdministratorsQuery,
  useGetCustomerByIdQuery,
  useDeleteCustomerMutation,
} = customerApi;
export const customerReducer = customerApi.reducer;
export default customerApi;
