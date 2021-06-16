import React, { useState, useEffect } from "react";
import MapGL, { Popup } from "react-map-gl";
import Numeral from "numeral";
import { Marker, NavigationControl } from "react-map-gl";

import "./Map.css";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmF6YWx5IiwiYSI6ImNrcHh2MGxtajA1dm4ycXQxbjgzbjdzbTEifQ.HzVi2toa42YCgvli214Tfw"; // Set your mapbox token here
const Map = ({ casesType, latitude, longitude, zoom, countries,country}) => {
  // console.log(countries);
  // console.log(latitude, longitude);
  const [showPopup, togglePopup] = useState(true);
  const InitialState = {
    latitude: latitude,
    longitude: longitude,
    center: [latitude, longitude],
    zoom: zoom,
    bearing: 0,
    pitch: 0,
  };
  const [viewport, setViewport] = useState(InitialState);
  useEffect(() => {
    setViewport({
      latitude: latitude,
      longitude: longitude,
      center: [latitude, longitude],
      zoom: zoom,
      bearing: 0,
      pitch: 0,
    });
    return () => {
      setViewport({});
    };
  }, [latitude, longitude, zoom]);
  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 800,
      rgba: "rgba(5, 155, 247, 0.5)",
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 1200,
      rgba: "rgba(53,211,156,0.5)",
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000,
      rgba: "rgba(233,30,99,0.5)",
    },
  };

  //show circle on the 🗺️
  const ShowInfo = (data, casesType = "cases") =>  
    data.map((country, index) => (
      <Marker
        key={index}
        longitude={country.countryInfo.long}
        latitude={country.countryInfo.lat}
      >
        <div
          className="map-marker"
          style={{
            backgroundColor: `${casesTypeColors[casesType].rgba}`,
            height: `${(country.cases / country.casesPerOneMillion) % 100}px`,
            width: `${(country.cases / country.casesPerOneMillion) % 100}px`,
          }}
        />
      </Marker>
    ))
  return (
    <div className="map">
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v10"
        // onViewportChange={setViewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {ShowInfo(countries)}
        <div className="map-nav">
          <NavigationControl onViewportChange={setViewport} />
        </div>
        {showPopup && (
          <Popup
            latitude={latitude}
            longitude={longitude}
            closeButton={true}
            closeOnClick={false}
            tipSize={12}
            onClose={() => togglePopup(false)}
            anchor="top"
          >
            <div>
            <img src={country.flag} alt="flag" style={{width: "4rem",height:"2rem"}} />
            <ul style={{listStyle: "none"}}>
              <li>
              Cases: {country.cases}
              </li>
              <li>
              Recovered: {country.recovered}
              </li>
              <li>
              Deaths: {country.deaths}
              </li>
            </ul>
            </div>
          </Popup>
        )}
      </MapGL>
    </div>
  );
};
export default Map;
