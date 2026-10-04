import { configureStore } from "@reduxjs/toolkit";
import hintReducer from "./hintSlice";

export const store = configureStore({
  reducer: {
    hint: hintReducer,
  },
});

export interface RootState {
  hint: {
    hintsRemaining: number;
    currentHint: string;
    notification: string;
  };
}