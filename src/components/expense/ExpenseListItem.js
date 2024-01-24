import React from "react";

const ExpenseListItem = ({ item, fetchAllExpense ,onEdit}) => {
  const handleDelete = async () => {
    try {
      const data = await fetch(
        `https://react-ecom-bootstrap-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${item.id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!data.ok) {
        console.error("Delete operation failed:", data.status);
        return;
      }
      const json = await data.json();
      console.log("Item successfully deleted", json);
      fetchAllExpense();
    } catch (error) {
      console.error("Delete operation failed:", error);
    }
  };
  const handleEdit = () => {
    onEdit(item)
  };

  return (
    <tr style={{ alignItems: "center" }}>
      <td>{item.type}</td>
      <td>{item.amount}</td>
      <td>{item.date}</td>
      <td>{item.description}</td>
      <td style={{ display: "flex", alignItems: "center" }}>
        <button
          style={{ width: "auto", marginRight: "4px", marginLeft: "2px" }}
          onClick={handleEdit}
        >
          Edit
        </button>
        <button style={{ width: "auto" }} onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ExpenseListItem;
