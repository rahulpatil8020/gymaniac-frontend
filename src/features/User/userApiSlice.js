import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/api/v1/user/${id}`,
    }),
  }),
});

export const { useGetUseQuery } = userApiSlice;
