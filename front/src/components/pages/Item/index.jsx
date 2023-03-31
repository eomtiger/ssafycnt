import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DataFirstI from "../../organism/DataFirstI"
import DataSecondI from "../../organism/DataSecondI"
import DataThirdI from "../../organism/DataThirdI";
import NavBarI from "../../organism/NavBarI";
import WorldMapI from "../../organism/WorldMapI";
import NewsTextMiningI from "../../organism/NewsTextMiningI";
function Item() {

  const params = useParams();

  // 지도 & 데이터 1열 axios 요청
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://ssafycnt.site:8000/ssafycnt-trade-service/api/trade/onerow?" +
  //       // "https://98320413-724a-44ba-a0b5-9b226001b6d6.mock.pstmn.io/api/trade/country/data1?" +
  //         "statCd=" +
  //         // "statcd=" +
  //         params.nationCode +
  //         "&" +
  //         "startDate=" +
  //         params.duration.substring(0, 6) +
  //         "&" +
  //         "endDate=" +
  //         params.duration.substring(7, 13)
  //     )
  //     .then((response) => setData(response.data));
  // }, [params]);

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
