import logo from "./../../../../public/assets/logo.svg";
import excel from "./../../../../public/assets/excel.svg";
import pdf from "./../../../../public/assets/pdf.svg";
import NationOrItem from "../../molecules/navBar/NationOrItem";
import NationSelector from "../../molecules/navBar/NationSelector";

function NavBar() {
  return (
    <>
      <nav className="flex justify-between space-x-5 sticky top-0 border-8 border-rose-400">
        <img src={logo} />
        <div className="content-center">
          <NationOrItem />
        </div>

        <p>
          교역지역/품목코드 선택
          <NationSelector />
        </p>

        <p>조회기준</p>
        <div className="">
          <img src={pdf} />
          <img src={excel} />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
