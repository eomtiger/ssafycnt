import React, { useState } from "react";
import Select from "react-select";
import Code from "../../../../assets/Code.json";
import unImg from "./../../../../../assets/nationalFlags/UN.png";

// const onErrorImg = (e) => {
//   e.target.src = unImg;
// };

const nationOptions = [];
for (let i = 3; i < Code.국가코드.length; i++) {
  let imgSrc =
    "./../../../../../assets/nationalFlags/" +
    Code.국가코드[i].Column1 +
    ".gif";
  const onErrorImg = (e) => {
    e.target.src = unImg;
  };
  // const altImgSrc = "./../../../../../assets/nationalFlags/UN.png";
  nationOptions.push({
    value: Code.국가코드[i].Column1 + " / " + Code.국가코드[i].Column2,
    label: (
      <div className="flex flex-inline ">
        <div className="w-10 h-10">
          <img src={imgSrc} onError={onErrorImg} alt="" />
        </div>
        <div className="">{Code.국가코드[i].Column2}</div>
      </div>
    ),
    // label: Code.국가코드[i].Column2,
    // 다음과 같이 표현가능
    // value: Code.국가코드[i]["Column1"]
  });
}
// console.log(nationOptions[0].value);

function NationSelector() {
  const [nationSelect, setNationSelect] = useState(nationOptions[0].value);
  const nationSelectHandler = (event) => {
    setNationSelect(event.value);
  };
  // console.log(nationSelect);

  const nationState = {
    nationCode: nationSelect.split(" / ")[0],
    nationName: nationSelect.split(" / ")[1],
  };
  // console.log(nationState);

  return (
    <div>
      <Select
        options={nationOptions}
        placeholder="국가를 검색해주세요."
        defaultValue={nationOptions[0]}
        onChange={nationSelectHandler}
      />
    </div>
  );
}

export default NationSelector;
