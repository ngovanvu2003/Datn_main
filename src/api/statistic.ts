/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IStatisticUrl {
  path: string;
  branch_id?: string;
  order_status?: string;
  date?: string;
  fromDate?: string;
  toDate?: string;
  combo_id?: string;
}

const statisticApi = createApi({
  reducerPath: "statistics",
  tagTypes: ["Statistic"],
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
    getStatistics: builder.query<{ meta: any; data: any }, IStatisticUrl>({
      query: (parameter) => {
        let url = `statistical/${parameter.path}`;
        url += parameter.branch_id ? `/${parameter.branch_id}` : "";
        url += parameter.order_status ? `/${parameter.order_status}` : "";
        url += parameter.date ? `/${parameter.date}` : "";
        url += parameter.fromDate ? `/${parameter.fromDate}` : "";
        url += parameter.toDate ? `/${parameter.toDate}` : "";
        url += parameter.combo_id ? `/${parameter.combo_id}` : "";
        return url;
      },
      providesTags: ["Statistic"],
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticApi;
export const statisticReducer = statisticApi.reducer;
export default statisticApi;
