


import React, { useState } from "react";
import axios from "axios";
// import "./App.css";




function CountryDetails() {
    
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch countries based on the search term
  const fetchCountries = async (term) => {
    if (!term) {
      setCountries([]); // Clear results if the input is empty
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

  // Handle input change and reset error
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term) {
      setCountries([]); // Clear results when input is empty
      setError("");
    }
  };

  // Handle button click
  const handleSearchClick = () => {
    fetchCountries(searchTerm); // Fetch results when the button is clicked
  };

  // Handle "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchCountries(searchTerm); // Fetch results when "Enter" is pressed
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
          onChange={handleInputChange} // Dynamically fetch on input change
          onKeyPress={handleKeyPress}  // Trigger search on "Enter" key press
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
              <strong>Region:</strong> {country.region}
            </p>
            <p>
              <strong>Capital:</strong> {country.capital?.[0]}
            </p>
            <p>
              <strong>Population:</strong>{" "}
              {country.population.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryDetails;





// import React, { useState } from "react";
// import axios from "axios";
// // import "./App.css";

// function CountryDetails() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch countries based on the search term
//   const fetchCountries = async (term) => {
//     if (!term) {
//       setCountries([]); // Clear results if the input is empty
//       setError("");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(
//         `https://restcountries.com/v3.1/name/${term}`
//       );
//       setCountries(response.data);
//     } catch (err) {
//       setError("No countries found. Please try a different search term.");
//       setCountries([]);
//     }
//     setLoading(false);
//   };

//   // Handle input change and reset error
//   const handleInputChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     if (!term) {
//       setCountries([]); // Clear results when input is empty
//       setError("");
//     }
//   };

//   // Handle button click
//   const handleSearchClick = () => {
//     fetchCountries(searchTerm); // Fetch results when the button is clicked
//   };

//   // Handle "Enter" key press
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       fetchCountries(searchTerm); // Fetch results when "Enter" is pressed
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Country Info App</h1>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Enter country name"
//           value={searchTerm}
//           onChange={handleInputChange} // Dynamically fetch on input change
//           onKeyPress={handleKeyPress} // Trigger search on "Enter" key press
//         />
//         <button onClick={handleSearchClick}>Search</button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="country-list">
//         {countries.map((country, index) => (
//           <div key={index} className="country-card">
//             <h2>{country.name.common}</h2>
//             <div className="image-container">
//               <img
//                 src={country.flags.svg}
//                 alt={`${country.name.common} flag`}
//               />
//             </div>

//             {/* Displaying additional information */}
//             <p><strong>Official Name:</strong> {country.name.official}</p>
//             <p><strong>Top-Level Domain:</strong> {country.tld?.[0]}</p>
//             <p><strong>Country Codes:</strong> {country.cca2}, {country.cca3}, {country.ccn3}</p>
//             <p><strong>Region:</strong> {country.region}</p>
//             <p><strong>Subregion:</strong> {country.subregion}</p>
//             <p><strong>Latitude & Longitude:</strong> {country.latlng?.join(", ")}</p>
//             <p><strong>Borders:</strong> {country.borders?.join(", ") || "No borders"}</p>
//             <p><strong>Population:</strong> {country.population?.toLocaleString() || "N/A"}</p>
//             <p><strong>Area (sq km):</strong> {country.area || "N/A"}</p>
//             <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(", ") || "N/A"}</p>
//             <p><strong>Translations:</strong> {Object.values(country.translations || {}).join(", ") || "N/A"}</p>
//             <p><strong>Demonym:</strong> {country.demonym || "N/A"}</p>

//             {/* Government & Administration */}
//             <p><strong>Independent:</strong> {country.independent ? "Yes" : "No"}</p>
//             <p><strong>UN Member:</strong> {country.unMember ? "Yes" : "No"}</p>
//             <p><strong>Currencies:</strong> {Object.values(country.currencies || {}).map(currency => currency.name).join(", ") || "N/A"}</p>
//             <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>

//             {/* Time Zones & Driving */}
//             <p><strong>Time Zones:</strong> {country.timezones?.join(", ") || "N/A"}</p>
//             <p><strong>Driving:</strong> {country.car?.sign === "right" ? "Right-hand drive" : "Left-hand drive"}</p>

//             {/* Flags & Symbols */}
//             <h3>Coat of Arms:</h3>
//             {country.coatOfArms?.svg && (
//               <div className="image-container">
//                 <img src={country.coatOfArms.svg} alt={`${country.name.common} coat of arms`} />
//               </div>
//             )}

//             {/* Other Details */}
//             <p><strong>Gini (Income Inequality):</strong> {country.gini || "N/A"}</p>
//             <p><strong>Olympic Code (CIOC):</strong> {country.cioc || "N/A"}</p>

//             {/* Map */}
//             <h3>Map</h3>
//             <iframe
//               title="map"
//               width="100%"
//               height="300"
//               src={`https://www.openstreetmap.org/export/embed.html?bbox=${country.latlng[1]-5},${country.latlng[0]-5},${country.latlng[1]+5},${country.latlng[0]+5}&layer=mapnik`}
//             ></iframe>
//             <p><a href={`https://www.openstreetmap.org/#map=5/${country.latlng[0]}/${country.latlng[1]}`} target="_blank" rel="noopener noreferrer">View Full Map</a></p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CountryDetails;





// import React, { useState } from "react";
// import axios from "axios";

// function CountryDetails() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchCountries = async (term) => {
//     if (!term) {
//       setCountries([]);
//       setError("");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(
//         `https://restcountries.com/v3.1/name/${term}`
//       );
//       setCountries([response.data[0]]);
//     } catch (err) {
//       setError("No countries found. Please try a different search term.");
//       setCountries([]);
//     }
//     setLoading(false);
//   };

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearchClick = () => {
//     fetchCountries(searchTerm);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       fetchCountries(searchTerm);
//     }
//   };

//   const renderLanguages = (languages) => {
//     if (!languages) return "N/A";
//     return Object.values(languages).join(", ");
//   };

//   const renderTranslations = (translations) => {
//     if (!translations) return "N/A";
//     return Object.values(translations).join(", ");
//   };

//   const renderCurrencies = (currencies) => {
//     if (!currencies) return "N/A";
//     return Object.values(currencies)
//       .map((currency) => currency.name)
//       .join(", ");
//   };

//   const renderBorders = (borders) => {
//     if (!borders) return "No borders";
//     return borders.join(", ");
//   };

//   return (
//     <div className="App">
//       <h1>Country Info</h1>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Enter country name"
//           value={searchTerm}
//           onChange={handleInputChange}
//           onKeyPress={handleKeyPress}
//         />
//         <button onClick={handleSearchClick}>Search</button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="country-list">
//         {countries.map((country, index) => (
//           <div key={index} className="country-card">
//             <h2>{country.name.common}</h2>

//             {/* Flag */}
//             <div className="image-container">
//               <img src={country.flags.svg} alt={`${country.name.common} flag`} />
//             </div>

//             {/* Basic Details */}
//             <p><strong>Official Name:</strong> {country.name.official}</p>
//             <p><strong>Top-level Domain:</strong> {country.tld?.[0]}</p>
//             <p><strong>Country Code (CCA2):</strong> {country.cca2}</p>
//             <p><strong>Country Code (CCA3):</strong> {country.cca3}</p>
//             <p><strong>Country Code (CCN3):</strong> {country.ccn3}</p>

//             {/* Geography & Location */}
//             <p><strong>Region:</strong> {country.region}</p>
//             <p><strong>Subregion:</strong> {country.subregion}</p>
//             <p><strong>Latitude & Longitude:</strong> {country.latlng?.join(", ")}</p>
//             <p><strong>Borders:</strong> {renderBorders(country.borders)}</p>

//             {/* Demographics */}
//             <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
//             <p><strong>Area (sq km):</strong> {country.area}</p>

//             {/* Languages & Culture */}
//             <p><strong>Languages:</strong> {renderLanguages(country.languages)}</p>
//             <p><strong>Translations:</strong> {renderTranslations(country.translations)}</p>
//             <p><strong>Demonym:</strong> {country.demonym}</p>

//             {/* Government & Administration */}
//             <p><strong>Independent:</strong> {country.independent ? "Yes" : "No"}</p>
//             <p><strong>UN Member:</strong> {country.unMember ? "Yes" : "No"}</p>
//             <p><strong>Currencies:</strong> {renderCurrencies(country.currencies)}</p>
//             <p><strong>Capital:</strong> {country.capital?.[0]}</p>

//             {/* Time Zones & Driving */}
//             <p><strong>Time Zones:</strong> {country.timezones?.join(", ")}</p>
//             <p><strong>Driving:</strong> {country.car?.sign === "right" ? "Right-hand drive" : "Left-hand drive"}</p>

//             {/* Flags & Symbols */}
//             <h3>Flag Image:</h3>
//             <div className="image-container">
//               <img src={country.flags.svg} alt={`${country.name.common} flag`} />
//             </div>
//             <h3>Coat of Arms:</h3>
//             {country.coatOfArms?.svg && (
//               <div className="image-container">
//                 <img src={country.coatOfArms.svg} alt={`${country.name.common} coat of arms`} />
//               </div>
//             )}

//             {/* Other Details */}
//             <p><strong>Gini (Income Inequality):</strong> {country.gini}</p>
//             <p><strong>Olympic Code (CIOC):</strong> {country.cioc}</p>

//             {/* Map */}
//             <h3>Map</h3>
//             <iframe
//               title="map"
//               width="100%"
//               height="300"
//               src={`https://www.openstreetmap.org/export/embed.html?bbox=${country.latlng[1]-5},${country.latlng[0]-5},${country.latlng[1]+5},${country.latlng[0]+5}&layer=mapnik`}
//             ></iframe>
//             <p><a href={`https://www.openstreetmap.org/#map=5/${country.latlng[0]}/${country.latlng[1]}`} target="_blank" rel="noopener noreferrer">View Full Map</a></p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CountryDetails;

