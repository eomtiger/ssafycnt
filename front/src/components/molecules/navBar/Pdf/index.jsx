import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import pdf from "../../../../assets/pdf.svg";
import Code from "../../../../assets/Code.json";
import { useParams } from "react-router-dom";

function Pdf() {
  const params = useParams();

  const pdfText = `Nation : ${params.nationCode}, Duration : ${params.duration}`;

  const downloadPdf = () => {
    const pdf = new jsPDF();
    pdf.text(pdfText, 10, 10);
    pdf.save(`Report_${params.nationCode}_${params.duration}`);
  };

  return (
    <>
      <button onClick={downloadPdf}>
        <img src={pdf} className="w-10 h-10 mr-5" />
      </button>
    </>
  );
}

export default Pdf;
