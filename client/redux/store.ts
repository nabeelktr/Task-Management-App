"use client"
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./features/apiSlice"



export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(apiSlice.middleware)
})
