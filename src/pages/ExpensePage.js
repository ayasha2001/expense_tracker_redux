import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpenseList from "../components/expense/ExpenseList";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../store/expenseSlice";
import ExpenseMenu from "../components/expense/ExpenseMenu";
import styles from "./ExpensePage.module.css";

const ExpensePage = () => {
  // const [arr, setArr] = useState([]);
  const [item, setItem] = useState({});
  const arr = useSelector((state) => state.expense.expenses);
  const isLight = useSelector((state) => state.theme.isLight);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllExpense();
  }, []);

  const onEdit = (item) => {
    setItem(item);
  };

  const onItemEdit = async (item) => {
    try {
      const data = await fetch(
        `https://react-ecom-bootstrap-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${item.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            type: item.type,
            amount: item.amount,
            date: item.date,
            description: item.description,
          }),
        }
      );
      if (!data.ok) {
        console.error("Item addition failed:", data.status);
        return;
      }
      const json = await data.json();
      console.log("Item successfully edited", json);
      fetchAllExpense();
    } catch (error) {
      console.error("Item addition failed:", error);
    }
  };

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
    let a = [];
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
      // console.log(json);
      for (const key in json) {
        a.push({ ...json[key], id: key });
      }
      // setArr(a);
      dispatch(expenseActions.saveAllExpense(a));
    } catch (error) {
      console.log("Adding expense failed:", error);
    }
  };

  return (
    <div className={isLight ? styles.light : styles.dark} style={{height:"100vh"}}>
      <ExpenseForm onItemAdd={onItemAdd} item={item} onItemEdit={onItemEdit} />
      <ExpenseMenu />
      <ExpenseList
        arr={arr}
        fetchAllExpense={fetchAllExpense}
        onEdit={onEdit}
      />
    </div>
  );
};

export default ExpensePage;
