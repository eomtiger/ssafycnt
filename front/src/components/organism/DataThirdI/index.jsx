import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExportImportToggle from "../../molecules/dataThird/ExportImportToggle";
import Table from "../../molecules/dataThirdI/Table";
import { AvatarCell } from "../../molecules/dataThird/Table";
import axios from "axios";
import codeName from "../../../assets/nationNameToCode.json";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  data3ImgAtom,
  pdfStateAtom,
  data3StateAtom,
} from "../../../states/recoilPdfState";
import html2canvas from "html2canvas";
import { excelStateI3, excelDisabled } from "../../../states/Excel";

function DataThirdI(props) {
  const [exportImportState, setExportImportState] = useState(true);
  const [excelData, setExcelData] = useRecoilState(excelStateI3);
  const params = useParams();
  const duration = params.duration;
  const [isLoading, setIsLoading] = useState(true);
  const [data3Img, setData3Img] = useRecoilState(data3ImgAtom);
  const [data3State, setData3State] = useRecoilState(data3StateAtom);
  const pdfState = useRecoilValue(pdfStateAtom);
  const [disable, setDisable] = useRecoilState(excelDisabled);
  // 이 코드가 안돌아감
  // 이유가 뭐지...?
  // 한번 더 저장하면 돌아감.
  useEffect(() => {
    if (pdfState === true) {
      const input = document.getElementById("data3ImgHandler");
      html2canvas(input).then((canvas) => {
        let data3 = canvas.toDataURL("image/png");
        setData3Img(data3);
        setData3State(true);
      });
    }
  }, [pdfState]);
  // console.log(pdfState);
  // console.log(data3State);

  const exColumns = useMemo(() => [
    { accessor: "ranking", Header: "순위" },
    {
      accessor: "nationCode",
      Header: "국가명",
      Cell: AvatarCell,
    },
    { accessor: "duration", Header: "조회기준" },
    { accessor: "expdlrSum", Header: "금액($)" },
    { accessor: "expdlrRatio", Header: " 금액 점유율(%)" },
    { accessor: "expwgtSum", Header: "중량(kg)" },
    { accessor: "expwgtRatio", Header: "중량 점유율(%)" },
    { accessor: "hsCode", Header: "품목코드(HS코드)" },
  ]);

  const imColumns = useMemo(() => [
    { accessor: "ranking", Header: "순위" },
    {
      accessor: "nationCode",
      Header: "국가명",
      Cell: AvatarCell,
    },
    { accessor: "duration", Header: "조회기준" },
    { accessor: "impdlrSum", Header: "금액($)" },
    { accessor: "impdlrRatio", Header: "금액 점유율(%)" },
    { accessor: "impwgtSum", Header: "중량(kg)" },
    { accessor: "impwgtRatio", Header: "중량 점유율(%)" },
    { accessor: "hsCode", Header: "품목코드(HS코드)" },
  ]);

  const [imData, setImData] = useState([]);

  const imDataHandler = (data) => {
    const temp = [];
    for (let objKey in data["importDetail"]) {
      data["importDetail"][objKey]["nationCode"] = objKey;
      data["importDetail"][objKey]["duration"] = data["period"];

      if (data["importDetail"][objKey]["impdlrRatio"] === 0) {
        data["importDetail"][objKey]["impdlrRatio"] = "0.0";
      }

      let num = data["importDetail"][objKey]["impdlrRatio"]
        .toString()
        .split(".");

      if (num != 100 && num != 50) {
        data["importDetail"][objKey]["impdlrRatio"] =
          num[0] + "." + num[1].slice(0, 1);
      }

      if (data["importDetail"][objKey]["impwgtRatio"] === 0) {
        data["importDetail"][objKey]["impwgtRatio"] = "0.0";
      }

      const a = data["importDetail"][objKey]["impwgtRatio"]
        .toString()
        .split(".");

      if (a != 100 && a != 50) {
        data["importDetail"][objKey]["impwgtRatio"] =
          a[0] + "." + a[1].slice(0, 1);
      }

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      num = data["importDetail"][objKey]["impdlrSum"].toLocaleString();
      data["importDetail"][objKey]["impdlrSum"] = num;

      num = data["importDetail"][objKey]["impwgtSum"].toLocaleString();
      data["importDetail"][objKey]["impwgtSum"] = num;

      data["importDetail"][objKey]["nationCode"] =
        codeName[data["importDetail"][objKey]["nationCode"]];

      temp.push(data["importDetail"][objKey]);
    }

    setImData(temp);
  };

  const [exData, setExData] = useState([]);

  const exDataHandler = (data) => {
    const temp = [];
    for (let objKey in data["exportDetail"]) {
      data["exportDetail"][objKey]["nationCode"] = objKey;
      data["exportDetail"][objKey]["duration"] = data["period"];

      if (data["exportDetail"][objKey]["expdlrRatio"] === 0) {
        data["exportDetail"][objKey]["expdlrRatio"] = "0.0";
      }

      let num = data["exportDetail"][objKey]["expdlrRatio"]
        .toString()
        .split(".");

      if (num != 100 && num != 50) {
        data["exportDetail"][objKey]["expdlrRatio"] =
          num[0] + "." + num[1].slice(0, 1);
      }

      if (data["exportDetail"][objKey]["expwgtRatio"] === 0) {
        data["exportDetail"][objKey]["expwgtRatio"] = "0.0";
      }

      const a = data["exportDetail"][objKey]["expwgtRatio"]
        .toString()
        .split(".");

      if (a != 100 && a != 50) {
        data["exportDetail"][objKey]["expwgtRatio"] =
          a[0] + "." + a[1].slice(0, 1);
      }

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      num = data["exportDetail"][objKey]["expdlrSum"].toLocaleString();
      data["exportDetail"][objKey]["expdlrSum"] = num;

      num = data["exportDetail"][objKey]["expwgtSum"].toLocaleString();
      data["exportDetail"][objKey]["expwgtSum"] = num;

      data["exportDetail"][objKey]["nationCode"] =
        codeName[data["exportDetail"][objKey]["nationCode"]];

      temp.push(data["exportDetail"][objKey]);
    }

    setExData(temp);
  };

  ///////여기에서 axios 쓴다
  useEffect(() => {
    axios
      .get(
        "https://ssafycnt.site:8000/ssafycnt-trade-service/api/trade/item/threerow?" +
          // "https://98320413-724a-44ba-a0b5-9b226001b6d6.mock.pstmn.io/api/trade/country/data3?" +
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
        exDataHandler(response.data);
        imDataHandler(response.data);
        setIsLoading(false);
        setExcelData(response.data);
        setDisable(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  const exportImportStateHandler = () => {
    setExportImportState(!exportImportState);
  };

  // const data = useMemo(
  //   () =>
  //     Array(100)
  //       .fill()
  //       .map(() => ({
  //         ranking: faker.datatype.number({ min: 1, max: 10 }),
  //         nationCode: faker.address.countryCode(),
  //         // imgSrc:
  //         //   "./../../../../../assets/nationalFlags/" +
  //         //   faker.address.countryCode() +
  //         //   ".gif",
  //         duration: "2022.3 - 2023.3",
  //         expdlrSum: faker.commerce.price(0, 100000000, 0, "$"),
  //         expdlrRatio: "11%",
  //         expwgtSum: faker.datatype.number({ min: 100000 }),
  //         expwgtRatio: "11%",
  //         hsCode: "전체품목",
  //       })),
  //   []
  // );

  // const [data3Img, setData2Img] = useRecoilState(data3ImgAtom);
  // useEffect(() => {
  //   const input = document.getElementById("data3ImgHadler");
  //   html2canvas(input).then((canvas) => {
  //     const data3 = canvas.toDataURL("image/png");
  //     setData2Img(data3);
  //   });
  // }, [exData]);
  // // console.log(data3Img);

  return (
    <>
      <hr className="mt-3"></hr>

      {isLoading && (
        <div className="mb-40 h-96">
          <div className="relative flex h-10 w-10 ml-96 mt-10 pt-60 ">
            <div className="animate-ping absolute h-24 w-24 rounded-full bg-sky-400 opacity-75"></div>
            <div className="relative  rounded-full bg-sky-500"></div>
          </div>
          <span className="text-5xl font-mun  mt-90">상세정보 로딩중...</span>
        </div>
      )}
      {!isLoading && (
        <div>
          <div onClick={exportImportStateHandler} className="mt-5 left-0">
            <ExportImportToggle
              exportImportState={exportImportState}
              params={params}
            />
          </div>
          <div className=" mt-5  text-gray-900" id="data3ImgHandler">
            <main className="mx-10 my-5">
              {/* mx-auto px-4 sm:px-6 lg:px-8 pt-4  */}

              {exportImportState === true ? (
                <div className="mt-2">
                  <Table
                    columns={exColumns}
                    data={exData}
                    exportImportState={exportImportState}
                  />
                </div>
              ) : (
                <div className="mt-2">
                  <Table
                    columns={imColumns}
                    data={imData}
                    exportImportState={exportImportState}
                  />
                </div>
              )}
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default DataThirdI;
