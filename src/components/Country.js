import React, { useState } from "react";
import axios from "axios";

function CountryDetails() {
const [searchTerm, setSearchTerm] = useState("");
const [countries, setCountries] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

  const fetchCountries = async (term) => {
    if (!term) {
      setCountries([]); 
      setError("");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${term}`
      );
      console.log(response.data);
      setCountries(response.data);
      
    } catch (err) {
      setError("No countries found. Please try a different search term.");
      setCountries([]);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term) {
      setCountries([]); 
      setError("");
    }
  };

  const handleSearchClick = () => {
    fetchCountries(searchTerm); 
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchCountries(searchTerm); 
    }
  };



  return (
    
    <div className="App">
      <h1>Country Info App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter country name"
          value={searchTerm}
          onChange={handleInputChange} 
          onKeyPress={handleKeyPress} 
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="country-list">
        {countries.map((country, index) => (
          <div key={index} className="country-card">
            <h2>{country.name.common}</h2>
            <div className="image-container">
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
              />
            </div>
            <p>
              <strong>Region:</strong> {country.region} </p>
            
            <p> <strong>Capital:</strong> {country.capital?.[0]} </p>
              
            <p><strong>Population:</strong>{" "}
              {country.population.toLocaleString()} </p>
              
             <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(", ")}</p>

     
    <p><strong>Maps:</strong> 
   <a href="https://goo.gl/maps/WSk3fLwG4vtPQetp7" alt="img" >Google Maps</a> ||
   <a href="https://www.openstreetmap.org/relation/304716"  alt="img">OpenStreetMaps</a> </p>  

        
{country && (
  <div>
    {country?.currencies && <p><strong>Currency:</strong> {Object.values(country.currencies).map(details => `${details?.name} (${details?.symbol})`).join(", ")}</p>}
    {country?.timezones && <p><strong>Time Zone:</strong> {country.timezones.join(", ")}</p>}
  </div>
)}
          </div>
        ))}
      </div>
    </div>
  );
}
    

export default CountryDetails;






