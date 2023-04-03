import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Chart from "react-google-charts";

function WorldMapI() {
  const params = useParams();
  const duration = params.duration;
  const [a, setA] = useState(params.hsCode);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const data1 = [
    ["Country", "balnce", "test"],
    ["Germany", -100, 100],
    ["United States", -75, 100],
    ["BR", -50, 100],
    ["CA", -25, 100],
    ["FR", 0, 100],
    ["RU", 25, 100],
    ["CN", 50, 100],
    ["Korea", 75, 100],
    ["JApan", 100, 100],
  ];
  const setAHandler = (e) => {
    setA(data[e][0]);
  };

  const [data, setData] = useState([]);

  const dataHandler = (data) => {
    const temp = [["Country", "무역수지 ($) "]];
    for (let i in data) {
      const item = [];
      item.push(i);
      item.push(data[i]["balpaymentsDlr"]);
      // item.push(data[i]["nationName"]);
      // item.push(100);
      temp.push(item);
    }

    setData(temp);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        "https://ssafycnt.site:8000/ssafycnt-trade-service/api/trade/item/zerorow?" +
          // "https://98320413-724a-44ba-a0b5-9b226001b6d6.mock.pstmn.io/api/trade/country/map?" +
          "item=" +
          params.hsCode +
          "&" +
          "startDate=" +
          params.duration.substring(0, 6) +
          "&" +
          "endDate=" +
          params.duration.substring(7, 13)
      )
      .then((response) => {
        dataHandler(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  useEffect(() => {
    navigate("/item/" + a + "/" + params.duration);
  }, [a]);

  const options = {
    // backgroundColor: "81d4fa",  "008000"
    colorAxis: {
      colors: ["265EAF"],
    },
    datalessRegionColor: "white",
    // forceIFrame: 20,
    geochartVersion: 11,
    height: 550,
    width: 1200,
    // legend: "none",
    tooltip: {
      textStyle: { fontName: "munchebu", fontSize: 12, bold: true },
      showColorCode: true,
      isHtml: true,
      ignoreBounds: true,
      text: "both",
    },
    // sizeAxis: { minValue: 0, maxSize: 20 },
  };

  return (
    <>
      {isLoading && (
        <div className="mb-40 h-96">
          <div class="relative flex h-10 w-10 ml-96 mt-10 pt-60 ">
            <div class="animate-ping absolute h-24 w-24 rounded-full bg-sky-400 opacity-75"></div>
            <div class="relative  rounded-full bg-sky-500"></div>
          </div>
          <span className="text-5xl font-mun  mt-90">세계지도 로딩중...</span>
        </div>
      )}

      {!isLoading && (
        <div className="mt-2 static flex justify-center">
          <Chart chartType="GeoChart" data={data} options={options} />
        </div>
      )}
    </>
  );
}

export default WorldMapI;
