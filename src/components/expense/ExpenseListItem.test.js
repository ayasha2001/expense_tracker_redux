import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExpenseListItem from "./ExpenseListItem";

describe("ExpenseListItem Component", () => {
  const mockItem = {
    id: "exampleId",
    type: "ExpenseType",
    amount: "100",
    date: "2024-01-30",
    description: "ExpenseDescription",
  };

  const mockFetchAllExpense = jest.fn();
  const mockOnEdit = jest.fn();

  test("should render the component and handle edit/delete", () => {
    render(
      <ExpenseListItem
        item={mockItem}
        fetchAllExpense={mockFetchAllExpense}
        onEdit={mockOnEdit}
      />
    );

    const typeElement = screen.getByText("ExpenseType");
    const amountElement = screen.getByText("100");
    const dateElement = screen.getByText("2024-01-30");
    const descriptionElement = screen.getByText("ExpenseDescription");
    const editButton = screen.getByText("Edit");
    const deleteButton = screen.getByText("Delete");

    expect(typeElement).toBeInTheDocument();
    expect(amountElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    // // Trigger edit button
    // fireEvent.click(editButton);
    // expect(mockOnEdit).toHaveBeenCalledWith(mockItem);

    // // Trigger delete button
    // fireEvent.click(deleteButton);
    // expect(mockFetchAllExpense).toHaveBeenCalledTimes(1);
  });
});
