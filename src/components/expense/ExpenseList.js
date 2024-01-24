import React from "react";
import "./ExpenseForm.css";
import ExpenseListItem from "./ExpenseListItem";

const ExpenseList = ({ arr }) => {
  console.log(arr);
  return (
    <div>
      <section className="content">
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody id="expenseTable">
            {arr?.map((item, i) => {
              return <ExpenseListItem item={item} key={i} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ExpenseList;
