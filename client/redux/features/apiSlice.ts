import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/",
  }),
  endpoints: (builder) => ({
    // getAllTasks: builder.mutation({
    //   query: (data) => ({
    //     url: "task-service/get-available-rooms",
    //     method: "POST",
    //     body: data,
    //     credentials: "include" as const,
    //   }),
    // }),

    // bookRoom: builder.mutation({
    //   query: (data) => ({
    //     url: "book-room",
    //     method: "POST",
    //     body: data,
    //     credentials: "include" as const,
    //   }),
    // }),

    getTasks: builder.query({
      query: () => ({
        url: "task-service/tasks",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // cancelBooking: builder.mutation({
    //   query: (data) => ({
    //     url: "cancel-booking",
    //     method: "POST",
    //     credentials: "include" as const,
    //     body: data,
    //   }),
    // }),

    // getActions: builder.query({
    //   query: () => ({
    //     url: "get-actions",
    //     method: "GET",
    //     credentials: "include" as const,
    //   }),
    // }),

    // changeRoomStatus: builder.mutation({
    //     query: (data) => ({
    //       url: "change-room-status",
    //       method: "POST",
    //       credentials: "include" as const,
    //       body: data,
    //     }),
    //   }),
  }),
});

export const {
  useGetTasksQuery,
} = apiSlice;
