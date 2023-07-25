import { apiSlice } from "app/api/apiSlice";
import { setUserInfo } from "./userSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (id) => `/api/v1/user`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserInfo(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetUserInfoQuery } = userApiSlice;
