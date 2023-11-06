/* eslint-disable @typescript-eslint/ban-types */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { AuthSignin, AuthSignup, IUser } from "../interface/user";


const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_API,
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<{access_token: string, information: IUser }, AuthSignin>({
      query: (users) => ({
        url: "auth/login",
        method: "POST",
        body: users,
      }),
    }),
    signup: builder.mutation<{meta: {}, data: IUser }, AuthSignup>({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;