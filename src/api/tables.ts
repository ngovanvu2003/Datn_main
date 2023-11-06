/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICheckParentsQr, ITable } from "../interface/table";

interface ITableSearch {
  name?: string;
  branch_id?: number | string;
}

const tableApi = createApi({
  reducerPath: "tables",
  tagTypes: ["Table"],
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
    getTables: builder.query<{ meta: any; data: any }, void>({
      query: () => ({
        url: "table",
        method: "POST",
      }),
      providesTags: ["Table"],
    }),
    getTablesOption: builder.query<{ meta: any; data: any }, string>({
      query: (string) => ({
        url: `table${string}`,
        method: "POST",
      }),
      providesTags: ["Table"],
    }),
    searchTable: builder.mutation<any, ITableSearch>({
      query: (search) => ({
        url: "table",
        method: "POST",
        body: search,
      }),
      invalidatesTags: ["Table"],
    }),
    paginateTable: builder.mutation<any, string>({
      query: (page) => ({
        url: `table?page=${page}`,
        method: "POST",
      }),
      invalidatesTags: ["Table"],
    }),
    getTableById: builder.query<{ meta: any; data: any }, string | number>({
      query: (id) => `table/show/${id}`,
      providesTags: ["Table"],
    }),
    addTable: builder.mutation<{ meta: { message: string } }, ITable>({
      query: (table) => ({
        url: "table/store",
        method: "POST",
        body: table,
      }),
      invalidatesTags: ["Table"],
    }),
    deleteTable: builder.mutation<{ meta: { message: string } }, ITable>({
      query: (table) => ({
        url: `table/delete`,
        method: "DELETE",
        body: {
          id: table.id,
        },
      }),
      invalidatesTags: ["Table"],
    }),
    updateTable: builder.mutation<{ meta: { message: string } }, ITable>({
      query: (table) => ({
        url: `table/update`,
        method: "PUT",
        body: table,
      }),
      invalidatesTags: ["Table"],
    }),
    checkParentsQr: builder.mutation<
      { meta: { message: string } },
      ICheckParentsQr
    >({
      query: (table) => ({
        url: `qrcode/check-parents-qr`,
        method: "POST",
        body: table,
      }),
      invalidatesTags: ["Table"],
    }),
    checkChildrenQr: builder.mutation<
      { meta: { message: string | undefined } },
      any
    >({
      query: (id) => ({
        url: `qrcode/check-children-qr`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["Table"],
    }),

    supportCustomer: builder.mutation<
      { meta: { message: string } },
      { id: string | number }
    >({
      query: (id) => ({
        url: `table/support-customer`,
        method: "PUT",
        body: id,
      }),
      invalidatesTags: ["Table"],
    }),
    getOrderById: builder.mutation<
      { meta: { message: string }; data: any },
      any
    >({
      query: (id) => ({
        url: `table/get-order-by-table/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Table"],
    }),
  }),
});

export const {
  useGetTablesQuery,
  useGetTablesOptionQuery,
  useSearchTableMutation,
  usePaginateTableMutation,
  useGetTableByIdQuery,
  useAddTableMutation,
  useDeleteTableMutation,
  useUpdateTableMutation,
  useCheckChildrenQrMutation,
  useCheckParentsQrMutation,
  useSupportCustomerMutation,
  useGetOrderByIdMutation,
} = tableApi;
export const tableReducer = tableApi.reducer;
export default tableApi;
