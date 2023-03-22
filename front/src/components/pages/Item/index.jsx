import React from "react";

function Item({ setNationOrItemHandler }) {
  return (
    <>
      <div>품목 페이지입니다</div>
      <button
        className="bg-indigo-500 mt-10"
        onClick={() => {
          setNationOrItemHandler("nation");
        }}
      >
        누르면 국가 페이지 렌더링
      </button>
    </>
  );
}

export default Item;
