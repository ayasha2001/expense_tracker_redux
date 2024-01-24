import React from "react";
import "./ExpenseForm.css";
import ExpenseListItem from "./ExpenseListItem";

const ExpenseList = ({ arr, fetchAllExpense,onEdit }) => {
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
              <th>options</th>
            </tr>
          </thead>
          <tbody id="expenseTable">
            {arr?.map((item) => {
              return (
                <ExpenseListItem
                  item={item}
                  key={item.id}
                  fetchAllExpense={fetchAllExpense}
                  onEdit={onEdit}
                />
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ExpenseList;
