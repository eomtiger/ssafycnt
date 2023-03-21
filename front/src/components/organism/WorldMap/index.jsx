import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

function WorldMap() {
  const [a, setA] = useState(-1);
  const data = [
    ["Country", "수출입", "수출"],
    ["Germany", 2, 100],
    ["United States", 3, 100],
    ["Brazil", 2, 100],
    ["Canada", 3, 100],
    ["France", 1, 100],
    ["RU", 1, 100],
    ["CN", 2, 100],
    ["South Korea", 2, 100],
    ["Japan", 1, 100],
  ];
  const options = {
    // backgroundColor: "",
    colorAxis: { colors: ["red", "yellow", "blue"] },
    // datalessRegionColor: "black",
    // forceIFrame: 20,
    geochartVersion: 11,
    height: 550,
    legend: "none",
    // tooltip: { textStyle: { color: "black" }, showColorCode: true },
    tooltip: { trigger: "focus" },
  };

  const chartEvents = [
    {
      eventName: "select",

      callback({ chartWrapper }) {
        const selectedId = chartWrapper.getChart().getSelection();
        if (selectedId.length) {
          console.log("selected Id", selectedId);
          setA(selectedId[0]["row"]);
          console.log(data[a + 1][0]);
        }
      },
    },
  ];
  return (
    <>
      <div className="mb-5">수출 수입</div>
      <Chart
        chartType="GeoChart"
        data={data}
        options={options}
        chartEvents={chartEvents}
      />
    </>
  );
}

export default WorldMap;
