import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const comboApi = createApi({
  reducerPath: "combo",
  tagTypes: ["Combo"],
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
    getCombo: builder.query<{ meta: any; data: any }, void>({
      query: () => "combo/list",
      providesTags: ["Combo"],
    }),
    getComboById: builder.query<{meta: any; data: any}, string | number>({
      query: (id) => `combo/show/${id}`,
      providesTags: ["Combo"],
    }),
    addCombo: builder.mutation<{ meta: { message: string } }, any>({
      query: (combo) => ({
        url: "combo/add",
        method: "POST",
        body: {
          name: combo.name,
          category_id: combo.category_id,
          price: combo.price,
        },
      }),
      invalidatesTags: ["Combo"],
    }),
    deleteCombo: builder.mutation<
      { meta: { message: string } },
      string | number
    >({
      query: (combo) => ({
        url: `combo/delete`,
        method: "DELETE",
        body: {
          id: combo,
        },
      }),
      invalidatesTags: ["Combo"],
    }),
  }),
});

export const { useGetComboQuery, useGetComboByIdQuery, useDeleteComboMutation, useAddComboMutation } =
  comboApi;
export const comboReducer = comboApi.reducer;
export default comboApi;
