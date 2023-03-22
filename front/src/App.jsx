import "./App.css";
import NavBar from "./components/organism/NavBar";
import DataFirst from "./components/organism/DataFirst";
import DataSecond from "./components/organism/DataSecond";
import DataThird from "./components/organism/DataThird/index";
import WorldMap from "./components/organism/WorldMap";
function App() {
  return (
    <>
      <NavBar />
      <WorldMap />
      <DataFirst />
      <DataSecond />
      <DataThird />
    </>
  );
}

export default App;
