import React, { useState } from "react";
import "./ForgotPassWord.css";

const ForgotPassWord = () => {
  const [email, setEmail] = useState("");
  const [msg, setMessage] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDqZwDjnF43ZY2c_T6j07yTFfJsQ1_09Rc",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Password Reset Failed:", errorData.error.message);
        return;
      }

      const data = await response.json();
      console.log("Password Reset:", data);
      setEmail("");
      setMessage("Check you Email for the reset password link")
    } catch (error) {
      console.error("Password Reset Failed:", error.message);
    }
  };

  return (
    <div className="forgot-password-form-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <label>Enter the email with which you have registered</label>
        <input
          placeholder="Enter Email"
          type="email"
          onChange={handleEmailChange}
          value={email}
        ></input>
        <p>{msg}</p>
        <button type="submit">Send Link</button>
      </form>
    </div>
  );
};

export default ForgotPassWord;
