import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICoupon } from "../interface/coupon";

const couponApi = createApi({
  reducerPath: "coupons",
  tagTypes: ["Coupon"],
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
    getCoupons: builder.query<{ data: any; meta: any; links: any }, string>({
      query: (string) => `coupon/list${string}`,
      providesTags: ["Coupon"],
    }),
    getCouponById: builder.query<{ meta: any; data: any }, string | number>({
      query: (id) => `coupon/show/${id}`,
      providesTags: ["Coupon"],
    }),
    addCoupon: builder.mutation<{ meta: { message: string }; data: any }, ICoupon>({
      query: (coupon) => ({
        url: "coupon/store",
        method: "POST",
        body: coupon,
      }),
      invalidatesTags: ["Coupon"],
    }),
    deleteCoupon: builder.mutation<{ meta: { message: string } }, string | number>({
      query: (id) => ({
        url: `coupon/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
    updateCoupon: builder.mutation<{ meta: { message: string } }, ICoupon>({
      query: (coupon) => ({
        url: `coupon/update/${coupon.id}`,
        method: "PUT",
        body: coupon
      }),
      invalidatesTags: ["Coupon"],
    }),
    forceDeleteCoupon: builder.mutation<{ meta: { message: string } }, string | number>({
      query: (id) => ({
        url: `coupon/destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useAddCouponMutation,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
  useForceDeleteCouponMutation
} = couponApi;
export const couponReducer = couponApi.reducer;
export default couponApi;
