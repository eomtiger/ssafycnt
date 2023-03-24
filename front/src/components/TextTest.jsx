import React from "react";
// import { render } from "react-dom";
import WordCloud from "react-d3-cloud";

const data = [
  { text: "Hey", value: 1000 },
  { text: "lol", value: 200 },
  { text: "first impression", value: 800 },
  { text: "very cool", value: 1000000 },
  { text: "duck", value: 10 },
];

function TextTest() {
  return (
    <>
      <WordCloud
        data={data}
        onWordClick={(event, d) => {
          console.log(`onWordClick: ${d.text}`);
        }}
      />
    </>
  );
}

export default TextTest;
