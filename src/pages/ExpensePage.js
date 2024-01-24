import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpenseList from "../components/expense/ExpenseList";

const ExpensePage = () => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    fetchAllExpense();
  }, []);

  const onItemAdd = async (item) => {
    try {
      const response = await fetch(
        "https://react-ecom-bootstrap-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Adding expense failed:", errorData.error.message);
        return;
      }

      const json = await response.json();
      console.log(json);
      fetchAllExpense();
    } catch (error) {
      console.log("Adding expense failed:", error);
    }
  };

  const fetchAllExpense = async () => {
    try {
      const response = await fetch(
        "https://react-ecom-bootstrap-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Adding expense failed:", errorData.error.message);
        return;
      }

      const json = await response.json();
      console.log(json);
      const expenseArray = Object.values(json);
      setArr(expenseArray);
    } catch (error) {
      console.log("Adding expense failed:", error);
    }
  };

  return (
    <div>
      <ExpenseForm onItemAdd={onItemAdd} />
      <ExpenseList arr={arr} />
    </div>
  );
};

export default ExpensePage;
