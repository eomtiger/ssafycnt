import React from "react";

import NavBar from "../../organism/NavBar";

import DataFirst from "../../organism/DataFirst";
import DataSecond from "../../organism/DataSecond";
import DataThird from "../../organism/DataThird/index";
import WorldMap from "../../organism/WorldMap";

function Nation({ setNationOrItemHandler }) {
  return (
    <>
      <NavBar />
      <button
        className="bg-indigo-500 mt-10"
        onClick={() => {
          setNationOrItemHandler("item");
        }}
      >
        누르면 품목 페이지 렌더링
      </button>
      <WorldMap />
      <DataFirst />
      <DataSecond />
      <DataThird />
    </>
  );
}

export default Nation;
