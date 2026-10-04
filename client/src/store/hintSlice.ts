import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hintsRemaining: 3,
  currentHint: "",
  notification: "",
};

const hintSlice = createSlice({
  name: "hint",
  initialState,
  reducers: {
    initStageHints: (state, action) => {
      state.hintsRemaining = Number(action.payload);
      state.currentHint = "";
    },
    setHintData: (state, action) => {
      state.currentHint = action.payload.hint;
      state.hintsRemaining = action.payload.hintsRemaining;

      if (action.payload.alreadyShown) {
        state.notification = `Hint already shown for this stage! (${action.payload.hintsRemaining} left)`;
      } else {
        state.notification = `Hint unlocked! You have ${action.payload.hintsRemaining} hint(s) left.`;
      }
    },
    clearNotification: (state) => {
      state.notification = "";
    },
  },
});

export const { initStageHints, setHintData, clearNotification } = hintSlice.actions;
export default hintSlice.reducer;