import React from "react";
import Select from "react-select";
import Code from "../../../../assets/Code.json";

const nationCode = [];
for (let i = 3; i < Code.국가코드.length; i++) {
  nationCode.push();
}

const imgSrc = "./../../../../../assets/nationalFlags/" + "AL" + ".gif";

const nationOptions = [];
for (let i = 3; i < Code.국가코드.length; i++) {
  let imgSrc =
    "./../../../../../assets/nationalFlags/" +
    Code.국가코드[i].Column1 +
    ".gif";
  const altImgSrc = "./../../../../../assets/nationalFlags/UN.png";
  nationOptions.push({
    value: Code.국가코드[i].Column1,
    label: (
      <div>
        <img
          src={imgSrc}
          onerror="this.src='./../../../../../assets/nationalFlags/UN.png';"
        />
        {Code.국가코드[i].Column2}
      </div>
    ),
    // label: Code.국가코드[i].Column2,
    // 다음과 같이 표현가능
    // value: Code.국가코드[i]["Column1"]
  });
}
// console.log(nationOptions);

// const imgSrc = "./../../../../../assets/nationalFlags/" + AL + ".gif";

function NationSelector() {
  return (
    <div>
      <Select options={nationOptions} placeholder="전세계" />
    </div>
  );
}

export default NationSelector;
