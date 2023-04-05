import { atom } from "recoil";

const data1ImgAtom = atom({
  key: "data1ImgAtom",
  default: "",
});

const data2ImgAtom = atom({
  key: "data2ImgAtom",
  default: "",
});

const data3ImgAtom = atom({
  key: "data3ImgAtom",
  default: "",
});

const textMiningImgAtom = atom({
  key: "textMiningImgAtom",
  default: "",
});

const pdfStateI = atom({
  key: "pdfStateI",
  default: false,
});

const data1State = atom({
  key: "data1State",
  default: false,
});

const data2State = atom({
  key: "data2State",
  default: false,
});

const data3State = atom({
  key: "data3State",
  default: false,
});

const textMiningState = atom({
  key: "textMiningState",
  default: false,
});

const preventClickAtom = atom({
  key: "preventClickAtom",
  default: false,
});

export {
  data1ImgAtom,
  data2ImgAtom,
  data3ImgAtom,
  textMiningImgAtom,
  pdfStateI,
  data1State,
  data2State,
  data3State,
  textMiningState,
  preventClickAtom,
};
