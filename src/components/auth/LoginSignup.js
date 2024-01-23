import React, { useState } from "react";
import "./LoginSignup.css";

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPasword, setCnfPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let headingText = "SignUp";
  let subBtnText = "Sign up";
  let btnText = "Have an account? Login";

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (password !== cnfPasword) {
      setErrorMessage("password doesn't match");
      return;
    }
    handleSignUp();
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqZwDjnF43ZY2c_T6j07yTFfJsQ1_09Rc",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Registration failed:", errorData.error.message);
        setErrorMessage(errorData.error.message);
        // alert("Registration failed");
        return;
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      setErrorMessage("");
      setEmail("");
      setPassword("");
      setCnfPassword("");
      alert("Registration successful");
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  const handleAuthSubmit = () => {
    setIsSignup((prev) => {
      return !prev;
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCnfPasswordChange = (event) => {
    setCnfPassword(event.target.value);
  };

  if (!isSignup) {
    headingText = "Login";
    subBtnText = "Login";
    btnText = "Don't have an account? Register";
  }

  return (
    <div className="main-div">
      <div className="form-container-div">
        <p className="heading">{headingText}</p>
        <form onSubmit={handleFormSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          ></input>
          <input
            type="password"
            placeholder="Confirm Password"
            value={cnfPasword}
            onChange={handleCnfPasswordChange}
            required
          ></input>
          {errorMessage.length > 0 && (
            <p className="error-message">{errorMessage}</p>
          )}
          <button type="submit">{subBtnText}</button>
        </form>
      </div>
      <div>
        <button className="already-btn" onClick={handleAuthSubmit}>
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;