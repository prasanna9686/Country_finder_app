


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Country from "./components/Country";
import LoginSignup from "./components/loginsignup";
// import "./loginsignup.css"
// import "./Country.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route for LoginSignup */}
          <Route path="/" element={<LoginSignup />} />
          {/* Route for Country */}
          <Route path="/country-details" element={<Country />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

