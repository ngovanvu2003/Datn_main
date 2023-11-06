import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const comboProductApi = createApi({
  reducerPath: "combo-product",
  tagTypes: ["ComboProduct"],
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
    getComboProduct: builder.query<{ meta: any; data: any }, void>({
      query: () => "combo_product/list",
      providesTags: ["ComboProduct"],
    }),
    addComboProduct: builder.mutation({
      query: (comboProduct) => ({
        url: "combo_product/add",
        method: "POST",
        body: comboProduct
      }),
      invalidatesTags: ["ComboProduct"]
    }),
    deleteComboProduct: builder.mutation<{ meta: { message: string } }, any>({
      query: (comboProduct) => ({
        url: `combo_product/delete`,
        method: "DELETE",
        body: comboProduct
      }),
      invalidatesTags: ["ComboProduct"],
    })
  }),
});

export const { 
  useGetComboProductQuery,
  useAddComboProductMutation,
  useDeleteComboProductMutation,
} = comboProductApi;
export const comboProductReducer = comboProductApi.reducer;
export default comboProductApi;
