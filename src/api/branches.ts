import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBranch } from "../interface/branch";

const branchApi = createApi({
  reducerPath: "branches",
  tagTypes: ["Branch"],
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
    getBranches: builder.query<{ meta: any; data: any }, void>({
      query: () => "branch",
      providesTags: ["Branch"],
    }),
    getBranchById: builder.query<{meta: any, data: any}, string | number>({
      query: (id) => `branch/show/${id}`,
      providesTags: ["Branch"],
    }),
    paginateBranch: builder.query<{meta: any, data: any}, string | number>({
      query: (page) => `branch?page=${page}`,
      providesTags: ["Branch"],
    }),
    addBranch: builder.mutation<{ meta: { message: string } }, IBranch>({
      query: (branch) => ({
        url: "branch/store",
        method: "POST",
        body: branch,
      }),
      invalidatesTags: ["Branch"],
    }),
    deleteBranch: builder.mutation<{ meta: { message: string } }, IBranch>({
      query: (branch) => ({
        url: `branch/delete`,
        method: "DELETE",
        body: {
          id: branch.id,
        },
      }),
      invalidatesTags: ["Branch"],
    }),
    updateBranch: builder.mutation<{ meta: { message: string } }, IBranch>({
      query: (branch) => ({
        url: `branch/update`,
        method: "PUT",
        body: branch,
      }),
      invalidatesTags: ["Branch"],
    }),
  }),
});

export const {
  useGetBranchesQuery,
  useGetBranchByIdQuery,
  usePaginateBranchQuery,
  useAddBranchMutation,
  useDeleteBranchMutation,
  useUpdateBranchMutation,
} = branchApi;
export const branchReducer = branchApi.reducer;
export default branchApi;
