import { useState } from "react";

import "./App.css";

import Item from "./components/pages/Item";
import Nation from "./components/pages/Nation";
function App() {
  const [nationOrItem, setNationOrItem] = useState("nation");

  const setNationOrItemHandler = (e) => {
    setNationOrItem(e);
  };

  return (
    <>
      {nationOrItem === "nation" ? (
        <>
          <Nation setNationOrItemHandler={setNationOrItemHandler} />
        </>
      ) : (
        <Item setNationOrItemHandler={setNationOrItemHandler} />
      )}
    </>
  );
}

export default App;
