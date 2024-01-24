import React, { useEffect, useState } from "react";
import githubIC from "../../assets/github-ic.png";
import webIC from "../../assets/web-ic.png";
import "./CompleteProfile.css";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // console.log(storedToken);
    setToken(storedToken || "");
  }, []);

  useEffect(() => {
    getAlreadyStoreDataIfExists();
  }, [token]);

  const getAlreadyStoreDataIfExists = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDqZwDjnF43ZY2c_T6j07yTFfJsQ1_09Rc",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Fetching user profile data failed:",
          errorData.error.message
        );
        return;
      }

      const data = await response.json();
      console.log(data?.users[0].photoUrl);
      setName(data?.users[0]?.displayName);
      setUrl(data?.users[0]?.photoUrl);
    } catch (error) {
      console.error("Fetching user profile data failed:", error.message);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try { 
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDqZwDjnF43ZY2c_T6j07yTFfJsQ1_09Rc",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            photoUrl: url,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("profile update failed:", errorData.error.message);
        return;
      }

      const data = await response.json();
      console.log(data);
      setName("");
      setUrl("");
    } catch (error) {
      console.error("profile update failed:", error.message);
    }
  };

  const handleCancel = () => {
    nav("/home");
  };

  return (
    <div className="main-prof-div">
      <div className="hb-container">
        <h1>Contact Detail</h1>
        <button className="cancel" onClick={handleCancel}>
          cancel
        </button>
      </div>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="label-input">
          <img src={githubIC} alt="GitHub Icon" />
          <label>Full Name :</label>
          <input
            type="text"
            onChange={handleNameChange}
            value={name}
            required
          />
        </div>
        <div className="label-input">
          <img src={webIC} alt="Web Icon" className="web-ic" />
          <label>Photo URL :</label>
          <input type="text" onChange={handleUrlChange} value={url} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
