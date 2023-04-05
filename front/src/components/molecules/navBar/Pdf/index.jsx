import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import pdf from "../../../../assets/pdf.svg";
import { useParams } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  data1ImgAtom,
  data2ImgAtom,
  data3ImgAtom,
  textMiningImgAtom,
  pdfStateI,
  data1State,
  data2State,
  data3State,
  textMiningState,
} from "../../../../states/recoilPdfState";

function Pdf() {
  const [buttonState, setButtonState] = useState(false);
  const data1Img = useRecoilValue(data1ImgAtom);
  const data2Img = useRecoilValue(data2ImgAtom);
  const data3Img = useRecoilValue(data3ImgAtom);
  const textMiningImg = useRecoilValue(textMiningImgAtom);
  const [dataState1, setDataState1] = useRecoilState(data1State);
  const [dataState2, setDataState2] = useRecoilState(data2State);
  const [dataState3, setDataState3] = useRecoilState(data3State);
  const [textMiningState1, setTextMiningState1] =
    useRecoilState(textMiningState);
  const [stateI, setStateI] = useRecoilState(pdfStateI);
  // setTimeout(() => {

  //   // console.log("Finish");
  // }, 10000);
  // console.log(data1Img);
  // console.log(data2Img);
  // console.log(data3Img);
  // console.log(textMiningImg)

  const params = useParams();

  useEffect(() => {
    setButtonState(false);
    setTimeout(() => {
      setButtonState(true);
    }, 5000);
  }, [params]);

  const pdfHead = `Nation : ${params.nationCode}, Duration : ${params.duration}`;
  const pdfData1 = `1. Export & Import Proportion`;
  const pdfData2 = `2. Export & Import TOP5 Country`;
  const pdfPage1 = "- 1 -";
  const pdfData3 = `3. Detail Statistics about ${params.nationCode}`;

  const downloadPdf = () => {
    setStateI(true);
  };
  // console.log(stateI);

  useEffect(() => {
    if (
      dataState1 === true &&
      dataState2 === true &&
      dataState3 === true &&
      textMiningState1 === true
    ) {
      const pdf = new jsPDF();
      pdf.text(pdfHead, 10, 10);
      pdf.text(pdfData1, 10, 30);
      pdf.addImage(data1Img, "JPEG", 0, 45, 200, 80);
      pdf.text(pdfData2, 10, 160);
      pdf.addImage(data2Img, "JPEG", 0, 175, 200, 80);
      pdf.text(pdfPage1, 100, 290);
      pdf.addPage("a4");
      pdf.text(pdfData3, 10, 30);
      pdf.addImage(data3Img, "JPEG", 5, 35, 200, 150);
      pdf.addImage(textMiningImg, "JPEG", 10, 180, 100, 100);

      pdf.save(`Report_${params.nationCode}_${params.duration}`);
      setStateI(false);
      setDataState1(false);
      setDataState2(false);
      setDataState3(false);
      setTextMiningState1(false);
    }
  }, [dataState1, dataState2, dataState3, textMiningState1]);
  // console.log(stateI);

  return (
    <>
      {buttonState === false ? (
        <button onClick={downloadPdf} disabled={!buttonState}>
          <img src={pdf} className="grayscale w-10 h-10 mr-5" />
        </button>
      ) : (
        <button onClick={downloadPdf} disabled={!buttonState}>
          <img src={pdf} className="w-10 h-10 mr-5" />
        </button>
      )}
      {/* <button onClick={downloadPdf}>
        <img src={pdf} className=" w-10 h-10 mr-5" />
      </button> */}
    </>
  );
}

export default Pdf;
