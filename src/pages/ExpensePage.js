import React, { useState } from "react";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpenseList from "../components/expense/ExpenseList";

const ExpensePage = () => {
  const [arr, setArr] = useState([]);

  const onItemAdd = (item) => {
    setArr((prev) => {
      return [...prev, item];
    });
  };

  return (
    <div>
      <ExpenseForm onItemAdd={onItemAdd} />
      <ExpenseList arr={arr} />
    </div>
  );
};

export default ExpensePage;
