import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DataFirstI from "../../organism/DataFirstI";
import DataSecondI from "../../organism/DataSecondI";
import DataThirdI from "../../organism/DataThirdI";
import NavBarI from "../../organism/NavBarI";
import WorldMapI from "../../organism/WorldMapI";
import NewsTextMiningI from "../../organism/NewsTextMiningI";
import html2canvas from "html2canvas";
import { useRecoilState } from "recoil";
import { data1ImgAtom } from "../../../states/recoilPdfState";

function Item() {
  const params = useParams();

  const [data1Img, setData1Img] = useRecoilState(data1ImgAtom);
  // console.log(data1Img);

  // ssafycnt-trade-service/api/trade/item/zerorow?item=854231&startDate=201901&endDate=202005
  // 지도 & 데이터 1열 axios 요청
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://ssafycnt.site:8000/ssafycnt-trade-service/api/trade/item/onerow?" +
          // "https://98320413-724a-44ba-a0b5-9b226001b6d6.mock.pstmn.io/api/trade/country/data1?" +
          "item=" +
          // "statcd=" +
          params.hsCode +
          "&" +
          "startDate=" +
          params.duration.substring(0, 6) +
          "&" +
          "endDate=" +
          params.duration.substring(7, 13)
      )
      .then((response) => {
        setData(response.data);
        const input = document.getElementById("data1ImgHandler");
        html2canvas(input).then((canvas) => {
          let data1 = canvas.toDataURL("image/png");
          setData1Img(data1);
        });
      });
  }, [params]);

  return (
    <>
      <div className="z-30 sticky top-0">
        <NavBarI />
      </div>
      <div className="z-0">
        <WorldMapI />
      </div>
      <DataFirstI data1={data} />
      <DataSecondI />
      <DataThirdI />
      <NewsTextMiningI />
    </>
  );
}

export default Item;
