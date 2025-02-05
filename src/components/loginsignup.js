import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {message} from "antd"


const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState("Login");
  const [formData, setFormData] = useState({
    email1: "",
    password1: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const openTab = (tabName) => setActiveTab(tabName);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // **Signup Function**
  const Signup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: formData.name,
        email: formData.email,
        uid: user.uid,
      });

      console.log("Signup Successful:", user);
      alert("Signup successful! Please log in.");
      message.success("signup succesfully")
      setActiveTab("Login"); // Switch to login tab

    } catch (error) {
      console.error("Signup Error:", error.message);
      alert(error.message);
    }
  };

  // **Login Function**
  const Login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email1, formData.password1);
      const user = userCredential.user;

      console.log("Login Successful:", user);
      navigate("/country-details"); // Redirect after login

    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="container">
      {/* Tabs for Login and Signup */}
      <div className="tab">
        <button className={`tablink ${activeTab === "Login" ? "active" : ""}`} onClick={() => openTab("Login")}>
          Login
        </button>
        <button className={`tablink ${activeTab === "Signup" ? "active" : ""}`} onClick={() => openTab("Signup")}>
          Signup
        </button>
      </div>

      {/* Login Form */}
      {activeTab === "Login" && (
        <div id="Login" className="tabcontent active">
          <h2>Login</h2>
          <form onSubmit={Login}>
            <input type="email" id="email1" placeholder="Email" required value={formData.email1} onChange={handleChange} />
            <input type="password" id="password1" placeholder="Password" required value={formData.password1} onChange={handleChange} />
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {/* Signup Form */}
      {activeTab === "Signup" && (
        <div id="Signup" className="tabcontent active">
          <h2>Signup</h2>
          <form onSubmit={Signup}>
            <input type="text" id="name" placeholder="Username" required value={formData.name} onChange={handleChange} />
            <input type="email" id="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
            <input type="password" id="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
            <button type="submit">Signup</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
