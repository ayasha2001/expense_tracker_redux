import { createSlice } from "@reduxjs/toolkit";

const expenseInitialState = { expenses: [] };

const expenseSlice = createSlice({
  name: "expense",
  initialState: expenseInitialState,
  reducers: {
    saveAllExpense(state, action) {
        console.log(action.payload)
      state.expenses=action.payload
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
