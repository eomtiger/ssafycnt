import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import pdf from "../../../../assets/pdf.svg";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  data1ImgAtom,
  data2ImgAtom,
  data3ImgAtom,
  textMiningImgAtom,
  pdfStateAtom,
  data1StateAtom,
  data2StateAtom,
  data3StateAtom,
  textMiningStateAtom,
  preventClickAtom,
} from "../../../../states/recoilPdfState";

function Pdf() {
  const [buttonState, setButtonState] = useState(false);
  const data1Img = useRecoilValue(data1ImgAtom);
  const data2Img = useRecoilValue(data2ImgAtom);
  const data3Img = useRecoilValue(data3ImgAtom);
  const textMiningImg = useRecoilValue(textMiningImgAtom);
  const [data1State, setData1State] = useRecoilState(data1StateAtom);
  const [data2State, setData2State] = useRecoilState(data2StateAtom);
  const [data3State, setData3State] = useRecoilState(data3StateAtom);
  const [textMiningState, setTextMiningState] =
    useRecoilState(textMiningStateAtom);
  const [pdfState, setPdfState] = useRecoilState(pdfStateAtom);
  const [preventClick, setPreventClick] = useRecoilState(preventClickAtom);

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
    setPreventClick(true);
    setPdfState(true);
  };
  // console.log(pdfState);

  useEffect(() => {
    if (
      data1State === true &&
      data2State === true &&
      data3State === true &&
      textMiningState === true
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
      setPdfState(false);
      setData1State(false);
      setData2State(false);
      setData3State(false);
      setTextMiningState(false);
      setTimeout(() => {
        setPreventClick(false);
      }, 100);
    }
  }, [data1State, data2State, data3State, textMiningState]);
  // console.log(pdfState);
  // console.log(preventClick);

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
