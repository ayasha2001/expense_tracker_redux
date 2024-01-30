import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthPage from "./pages/AuthPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CompleteProfile from "./components/profile/CompleteProfile";
import ForgotPassWordPage from "./pages/ForgotPassWordPage";
import ExpensePage from "./pages/ExpensePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AuthPage />,
      },
      
      {
        path: "/profile",
        element: <CompleteProfile />,
      },
      {
        path: "/forget",
        element: <ForgotPassWordPage />,
      },
      {
        path: "/expense",
        element: <ExpensePage />,
      },
    ],
  },
]);

root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
