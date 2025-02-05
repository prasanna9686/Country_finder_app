import React, { useState } from "react";
import axios from "axios";
import "./country.css";

function CountryDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCountries = async () => {
    if (!searchTerm) return;

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${searchTerm}`
      );
      setCountries(response.data);
    } catch (err) {
      setError("No countries found. Please try a different search term.");
      setCountries([]);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Country Info App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter country name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={fetchCountries}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="country-list">
        {countries.map((country, index) => (
          <div key={index} className="country-card">
            <h2>{country.name.common}</h2>
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Capital:</strong> {country.capital?.[0]}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryDetails;