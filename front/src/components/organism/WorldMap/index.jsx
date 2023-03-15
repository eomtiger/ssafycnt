import React from "react";
import Chart from "react-google-charts";

function WorldMap() {
  const data = [
    ["Country", "???", "수출입"],
    ["Germany", 200, 100],
    ["United States", 300, 200],
    ["Brazil", 400, 300],
    ["Canada", 500, 400],
    ["France", 600, 500],
    ["RU", 700, 600],
    ["China", 500, 799],
    ["South Korea", 1000, 1000],
  ];
  return (
    <>
      <Chart chartType="GeoChart" width="100%" height="400px" data={data} />
    </>
  );
}

export default WorldMap;
