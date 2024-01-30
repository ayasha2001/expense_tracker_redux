import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./../store/authSlice";

const Header = () => {
  const nav = useNavigate();
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

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
    dispatch(authActions.logout());
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
      <div className="home-container-div" style={{ display: "flex", justifyContent:"space-between"}}>
       <div>
        <h1 style={{color:"white"}}></h1>
       </div>
        <div>
          <button onClick={handleEmailVerification} className="btn-home-page">
            Verify Email
          </button>
          <button onClick={handleLogOut} className="btn-home-page" style={{margin:"3px"}}>
            Logout
          </button>
        </div>
      </div>

      {/* <p className="error-msg">{errorMsg}</p> */}
    </>
  );
};

export default Header;
