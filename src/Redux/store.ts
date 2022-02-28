import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./imageReducer";

export const store = configureStore({
    reducer:{
        images:imageReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootStae = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch