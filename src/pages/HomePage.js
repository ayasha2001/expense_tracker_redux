import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import ExpensePage from "./ExpensePage";

const HomePage = () => {
  const nav = useNavigate();
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // console.log(storedToken);
    setToken(storedToken || "");
  }, []);

  const handleNavigation = () => {
    nav("/profile");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  const handleEmailVerification = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDqZwDjnF43ZY2c_T6j07yTFfJsQ1_09Rc",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Email verication failed:", errorData.error.message);
        return;
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Email verication failed:", error.message);
    }
  };

  return (
    <>
      <div className="home-container-div">
        <h1>Welcome to Expense Tracker</h1>
        <button onClick={handleNavigation} className="btn-home-page">
          your profile is incomplete. Complete now
        </button>
        <button onClick={handleLogOut} className="btn-home-page">
          Logout
        </button>
      </div>
      <button onClick={handleEmailVerification} className="btn-home-page">
        Verify Email
      </button>
      <p className="error-msg">{errorMsg}</p>
      {/* <ExpensePage /> */}
    </>
  );
};

export default HomePage;
