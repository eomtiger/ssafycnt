import React, { useState } from "react";

import logo from "./../../../../public/assets/logo.svg";
import excel from "./../../../../public/assets/excel.svg";
import pdf from "./../../../../public/assets/pdf.svg";
import NationOrItem from "../../molecules/navBar/NationOrItem";
import NationSelector from "../../molecules/navBar/NationSelector";
import ViewPeriod from "../../molecules/navBar/ViewPeriod";

function NavBar() {
  // Nation, Item의 state에서 Default를 Nation으로 설정
  const [state, setState] = useState("Nation");

  // stateHandler라는 함수를 사용하여 state를 이용
  const stateHandler = (state) => {
    setState(state);
    console.log(state);
  };

  return (
    <>
      <nav className="flex justify-between space-x-5 sticky top-0 border-8 border-rose-400">
        <img src={logo} />
        <div className="content-center">
          <NationOrItem stateHandler={stateHandler} />
          {/* 상태확인 */}
          {state}
        </div>

        {state === "Nation" ? <NationSelector /> : null}
        {state === "Item" ? <div>항목</div> : null}

        <div>
          <ViewPeriod />
        </div>

        <div className="">
          <img src={pdf} />
          <img src={excel} />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
