import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./App.css";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldWide");
  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json();
      // console.log(data);
      const countries = data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso3,
      }));
      setCountries(countries);
    };
    getCountries();
  }, []);
  // console.log(countries);
  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  };
  return (
    <div className="app">
      {/* header */}
      <div className="app__header">
        <h1>Covid Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldWide">{country}</MenuItem>
            {/* map through the countries and  show in dropdown */}
            {countries.map((country, index) => (
              <MenuItem value={country.name} key={index}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* title => dropdown */}
      {/* InfoBox1 */}
      {/* InfoBox2 */}
      {/* InfoBox3 */}
      {/* Table */}
      {/* graph */}
      {/* map */}
    </div>
  );
};

export default App;
