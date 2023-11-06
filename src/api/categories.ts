/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory } from "../interface/categories";

const categoryApi = createApi({
  reducerPath: "categories",
  tagTypes: ["Category"],
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
    getCategories: builder.query<ICategory[], void>({
      query: () => "category/list-category",
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query<ICategory, string | number>({
      query: (id) => `category/show-category/${id}`,
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: (product) => ({
        url: "category/create-category",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<ICategory, string | number>({
      query: (id) => ({
        url: `category/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<{ meta: { message: string } }, ICategory>({
      query: (category) => ({
        url: `category/update-category/${category.id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    paginateTable: builder.mutation<any, string>({
      query: (page) => ({
        url: `/category/list-category?page=${page}`,
        method: "GET"
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  usePaginateTableMutation
} = categoryApi;
export const categoryReducer = categoryApi.reducer;
export default categoryApi;
