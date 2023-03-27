import React, { useState, useEffect } from "react";
import axios from "axios";
// import { render } from "react-dom";
import TextMiningInfo from "../../../assets/TextMiningInfo.json";
import WordCloud from "react-d3-cloud";

// const textMiningInfo = Object.keys(TextMiningInfo);
// const textInfo = [];
// for (let i = 0; i < textMiningInfo.length; i++) {
//   let wordString = textMiningInfo[i];
//   textInfo.push({
//     text: wordString,
//     value: TextMiningInfo[wordString].length,
//   });
// }
// console.log(textInfo);

function TextMining() {
  const url =
    "http://ssafycnt.site:8000/ssafycnt-news-service/api/news/mining?" +
    "country=" +
    "&item=" +
    "&startDate=" +
    "&endDate=";
  // console.log(url);

  const [textData, setTextData] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => setTextData(response.data));
  }, []);
  console.log("textData", textData);

  const textDataKeys = Object.keys(textData);
  // // console.log(textDataKeys);

  const textDataInfo = [];
  for (let i = 0; i < textData.length - 500; i++) {
    let wordString = textDataKeys[i];
    // console.log(wordString);
    textDataInfo.push({
      text: wordString,
      value: textData[wordString].length,
    });
  }
  // console.log(textDataInfo);

  return (
    <>
      <div>1</div>
      {/* <WordCloud
        data={textInfo}
        onWordClick={(event, d) => {
          console.log(`onWordClick: ${d.text}`);
        }}
      /> */}
    </>
  );
}

export default TextMining;
