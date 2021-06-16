import React, { useState } from "react";
import MapGL from "react-map-gl";
import "./Map.css";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmF6YWx5IiwiYSI6ImNrcHh2MGxtajA1dm4ycXQxbjgzbjdzbTEifQ.HzVi2toa42YCgvli214Tfw"; // Set your mapbox token here
const Map = ({casesType, latitude, longitude, zoom, countries }) => {
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    center: [latitude, longitude],
    zoom: zoom,
    bearing: 0,
    pitch: 0,
  });
  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 800,
    },
    recovered: {
      hex: "#CC1034",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000,
    },
  };
  //show circle on the 🗺️
  const ShowInfo = (data, casesType = "cases") => {
    data.map((country) => (
    
      <>
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      </>
    ));
  };

  return (
    <div className="map">
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        maxZoom={20}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
      {/* loop through all the countries and draw circle cases */}
      {ShowInfo(countries,casesType)}
    </div>
  );
};
export default Map;