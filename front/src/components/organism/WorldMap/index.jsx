import React from "react";
import Chart from "react-google-charts";

function WorldMap() {
  const data = [
    ["Country", "Popularity"],
    ["Germany", 200],
    ["United States", 300],
    ["Brazil", 400],
    ["Canada", 500],
    ["France", 600],
    ["RU", 700],
    ["China", 500],
    ["South Korea", 1000],
  ];
  return (
    <>
      <Chart chartType="GeoChart" width="100%" height="400px" data={data} />
    </>
  );
}

export default WorldMap;
