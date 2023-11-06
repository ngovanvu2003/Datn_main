/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IReservation } from "../interface/reservation";

const ReservationApi = createApi({
  reducerPath: "Reservations",
  tagTypes: ["Reservation"],
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
    getReservations: builder.query<{ meta: any; data: any }, void>({
      query: () => ({
        url: "reservation/list",
        method: "POST",
      }),
      providesTags: ["Reservation"],
    }),
    getReservationsOption: builder.query<{ meta: any; data: any }, any>({
      query: (string) => ({
        url: `reservation/list`,
        method: "POST",
        body: string,
      }),
      providesTags: ["Reservation"],
    }),
    getReservationId: builder.query<{ meta: any; data: any }, string | number>({
      query: (id) => `reservation/show/${id}`,
      providesTags: ["Reservation"],
    }),

    addReservation: builder.mutation<
      { meta: { message: string } },
      IReservation
    >({
      query: (Reservation) => ({
        url: "reservation/store",
        method: "POST",
        body: Reservation,
      }),
      invalidatesTags: ["Reservation"],
    }),

    updateReservation: builder.mutation<
      { meta: { message: string } },
      IReservation
    >({
      query: (Reservation) => ({
        url: `reservation/update/${Reservation.id}`,
        method: "PUT",
        body: Reservation,
      }),
      invalidatesTags: ["Reservation"],
    }),
    paginateReservation: builder.mutation<any, string>({
      query: (page) => ({
        url: `reservation/list?page=${page}`,
        method: "POST",
      }),
      invalidatesTags: ["Reservation"],
    }),
    paginateIfReservation: builder.mutation<any, string>({
      query: (page) => ({
        url: `reservation/list?page=${page}`,
        method: "POST",
        body: {
          reservation_status: 1,
        },
      }),
      invalidatesTags: ["Reservation"],
    }),
  }),
});

export const {
  useGetReservationsQuery,
  useGetReservationsOptionQuery,
  useAddReservationMutation,
  useGetReservationIdQuery,
  useUpdateReservationMutation,
  usePaginateReservationMutation,
  usePaginateIfReservationMutation,
} = ReservationApi;
export const reservationReducer = ReservationApi.reducer;
export default ReservationApi;
