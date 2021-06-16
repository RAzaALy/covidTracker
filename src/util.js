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
export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  return sortedData;
  // sortedData.sort((a, b) => {
  //   if (a.cases > b.cases) {
  //     return -1;
  //   } else {
  //     return 1;
  //   }
  // });
  // return sortedData;
};
//show circle on the 🗺️
// export const ShowInfo = (data, casesType = "cases") => {
//   data.map((country) => (
//     <Circle>
//       center={[country.countryInfo.lat, country.countryInfo.long]}
//       fillOpacity={0.4}
//       color={casesTypeColors[casesType].hex}
//       fillColor={casesTypeColors[casesType].hex}
//       radius={
//         Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
//       }
//       <Popup>
//         <h1>Im popup</h1>
//       </Popup>
//     </Circle>
//   ));
// };
