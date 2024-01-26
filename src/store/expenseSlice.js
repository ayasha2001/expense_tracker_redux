import { createSlice } from "@reduxjs/toolkit";

const expenseInitialState = { expenses: [], maxAmount: 0 };

const expenseSlice = createSlice({
  name: "expense",
  initialState: expenseInitialState,
  reducers: {
    saveAllExpense(state, action) {
      console.log(action.payload);
      state.expenses = action.payload;
      state.maxAmount = calculateMaxAmount(action.payload);
    },
  },
});
const calculateMaxAmount = (products) => {
  const amounts = products.map((product) => product.amount);
  return amounts.reduce((sum, amount) => sum + Number(amount), 0);
};

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
