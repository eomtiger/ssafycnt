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

export {
  data1ImgAtom,
  data2ImgAtom,
  data3ImgAtom,
  textMiningImgAtom,
  pdfStateI,
};
