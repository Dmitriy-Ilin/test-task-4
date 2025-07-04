import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
