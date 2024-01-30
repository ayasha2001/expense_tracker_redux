import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import ExpensePage from "./ExpensePage";
import store from "../store/store";

describe("ExpensePage Component", () => {
  test("should fetch expenses on component mount", async () => {

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          amount: "500",
          date: "2024-01-26",
          description: "on way back",
          type: "Petrol",
          id: "-Np3e1S4R6VzMojZ65yY",
        }),
    });

    render(
      <Provider store={store}>
        <ExpensePage />
      </Provider>
    );

    // to ensure fetch function is called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith(
      "https://react-ecom-bootstrap-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
    );

    // Wait for the component to render
    waitFor(() => {
      const text = screen.getByText("Petrol");
      expect(text).toBeInTheDocument();
    });

    // Clean up mock ver imp
    global.fetch.mockRestore();
  });

});
