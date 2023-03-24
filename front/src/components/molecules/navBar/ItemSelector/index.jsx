import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import Modal from "react-modal";
import Code from "../../../../assets/Code.json";

// vlaue에 codeColumn2 + " / " + codeColumn4 + " / " + codeColumn5과
const itemOptions = [];
for (let i = 4; i < Code.성질통합분류코드.length; i++) {
  let codeColumn2 = Code.성질통합분류코드[i].Column2;
  let codeColumn4 = Code.성질통합분류코드[i].Column4;
  let codeColumn5 = Code.성질통합분류코드[i].Column5;
  if (codeColumn4.length >= 20 && codeColumn5.length >= 20) {
    itemOptions.push({
      value: codeColumn2 + " / " + codeColumn4 + " / " + codeColumn5,
      label:
        codeColumn2 +
        " / " +
        codeColumn4.substr(0, 19) +
        " ..." +
        " / " +
        codeColumn5.substr(0, 19) +
        " ...",
    });
  } else if (codeColumn4.length >= 20 && codeColumn5.length < 20) {
    itemOptions.push({
      value: codeColumn2 + " / " + codeColumn4 + " / " + codeColumn5,
      label:
        codeColumn2 +
        " / " +
        codeColumn4.substr(0, 19) +
        " ..." +
        " / " +
        codeColumn5,
    });
  } else if (codeColumn4.length < 20 && codeColumn5.length >= 20) {
    itemOptions.push({
      value: codeColumn2 + " / " + codeColumn4 + " / " + codeColumn5,
      label:
        codeColumn2 +
        " / " +
        codeColumn4 +
        " / " +
        codeColumn5.substr(0, 19) +
        " ...",
    });
  } else {
    itemOptions.push({
      value: codeColumn2 + " / " + codeColumn4 + " / " + codeColumn5,
      label: codeColumn2 + " / " + codeColumn4 + " / " + codeColumn5,
    });
  }
}

// react-select/async 사용
const filterNations = (inputValue) => {
  return itemOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

// Promise 사용
const promiseOptions = (inputValue) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterNations(inputValue));
    }, 1000);
  });

function ItemSelector() {
  const [IsOpen, setIsOpen] = useState(false);

  // Modal을 Open하는 함수
  const openModal = () => {
    setIsOpen(true);
  };

  // const afterOpenModal = () => {
  //   // references are now sync'd and can be accessed.
  // };

  // Modal을 Close하는 함수
  const closeModal = () => {
    setIsOpen(false);
  };

  const [codeCoulmn, setCodeColumn] = useState("");
  const codeColumnHandler = (event) => {
    setCodeColumn(event.value);
  };

  const allCodeColumn = {
    hsCode: codeCoulmn.split(" / ")[0],
    fourDigit: codeCoulmn.split(" / ")[1],
    tenDigit: codeCoulmn.split(" / ")[2],
  };

  // console.log(allCodeColumn);
  return (
    <div>
      <button onClick={openModal}>품목 설정</button>
      <Modal
        ariaHideApp={false}
        isOpen={IsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <AsyncSelect
          cacheOptions
          defaultOptions={false}
          loadOptions={promiseOptions}
          filterOption={null}
          placeholder="품목명이나 hsCode를 입력하세요."
          onChange={codeColumnHandler}
        />
        <br />
        <br />
        <h2>HS CODE</h2>
        <div>{allCodeColumn.hsCode}</div>
        <br />
        <hr />
        <br />
        <h2>세번 4단위품명</h2>
        <div>{allCodeColumn.fourDigit}</div>
        <br />
        <hr />
        <br />
        <h2>세번 10단위품명</h2>
        <div>{allCodeColumn.tenDigit}</div>
      </Modal>
      <div></div>
    </div>
  );
}

// const ItemSelector = React.memo(() => {
//   return (
//     <div>
//       <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
//     </div>
//   );
// });

export default ItemSelector;
