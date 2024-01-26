import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { themeActions } from "../../store/themeSlice";
import { Link } from "react-router-dom";

const ExpenseMenu = () => {
  const dispatch = useDispatch();
  const maxExpense = useSelector((state) => state.expense.maxAmount);
  const arr = useSelector((state) => state.expense.expenses);
  const handleToggle = () => {
    dispatch(themeActions.toggleTheme());
  };

//   console.log(csvContent)

  const handleDownloadCSV = () => {
    // Example CSV content
    const header = "Type,Amount,Date,Description";
    const rows = arr.map((expense) =>
      `${expense.type},${expense.amount},${expense.date},${expense.description}`
    );
    const csvContent = `${header}\n${rows.join("\n")}`;
  
    // Convert CSV content to data URI
    const csvDataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
  
    // Create a link with download attribute and trigger click
    const link = document.createElement("a");
    link.href = csvDataUri;
    link.download = "expenses.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <div>
      <button onClick={handleToggle}>toggle theme</button>
      {maxExpense > 10000 && <Link to="#" onClick={handleDownloadCSV} download="expenses.csv">
          Download CSV
        </Link>}
    </div>
  );
};

export default ExpenseMenu;
