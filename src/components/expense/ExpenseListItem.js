import React from "react";

const ExpenseListItem = ({item}) => {
    console.log(item)
  return (
    <tr>
      <td>{item.type}</td>
      <td>{item.amount}</td>
      <td>{item.date}</td>
      <td>{item.description}</td>
    </tr>
  );
};

export default ExpenseListItem;
