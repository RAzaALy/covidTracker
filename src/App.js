import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  Card,
  CardContent,
  MenuItem,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import "./App.css";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  useEffect(() => {
   fetch("https://disease.sh/v3/covid-19/all").then(response => response.json()).then(data => {
     setCountryInfo(data);
   })
  }, [])
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
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    const response = await fetch(url);
    const data = await response.json();
    setCountryInfo(data);
  };
  // console.log(countryInfo);
  return (
    <div className="app">
      {/* left panel */}
      <div className="app__left">
        {/* header */}
        <div className="app__header">
          <h1>COVID TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="Worldwide">{country}</MenuItem>
              {/* map through the countries and  show in dropdown */}
              {countries.map((country, index) => (
                <MenuItem value={country.name} key={index}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {/* InfoBoxes */}

          <InfoBox
            title="Coranavirus cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          ></InfoBox>
          <InfoBox
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
            title="Recovered"
          ></InfoBox>
          <InfoBox
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          ></InfoBox>
        </div>
        {/* map */}
        <Map />
      </div>
      {/* right panel */}
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases by Country</h3>
          {/* graph */}
          <h2>Worldwide New Cases</h2>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
