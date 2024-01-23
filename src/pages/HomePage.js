import React from "react";
import {useNavigate} from "react-router-dom";

const HomePage = () => {

  const nav = useNavigate()

  const handleClick = () => {
    nav("/profile")
  }

  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <button
        style={{ backgroundColor: "rgb(139, 92, 92)", color: "white" }}
        onClick={handleClick}
      >
        your profile is incomplete. Complete now
      </button>
    </div>
  );
};

export default HomePage;
