/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IKitchen } from "../interface/kitchen";

const kitChenApi = createApi({
  reducerPath: "menus",
  tagTypes: ["kitChen"],
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
    getMenus: builder.query<{ meta: any; data: any }, string>({
      query: (string) => `order-detail/list${string}`,
      providesTags: ["kitChen"],
    }),
    getMenusRight: builder.query<{ meta: any; data: any }, string>({
      query: (string) => `order-detail/list${string}`,
      providesTags: ["kitChen"],
    }),
   
    updateMenu: builder.mutation<{ meta: { message: string } },IKitchen>({
      query: (order) => ({
        url: `order-detail/update/${order.orderableId}`,
        method: "PUT",
        body:{
          orderable_status:order.orderable_status
        }
      }),
      invalidatesTags: ["kitChen"],
    }),
    
  }),
});

export const {
  useGetMenusQuery,
  useUpdateMenuMutation,
  useGetMenusRightQuery
} = kitChenApi;
export const kitchenReducer = kitChenApi.reducer;
export default kitChenApi;
