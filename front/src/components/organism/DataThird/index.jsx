import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { faker } from "@faker-js/faker";
import Table from "../../molecules/dataThird/Table";
import { AvatarCell } from "../../molecules/dataThird/Table";
import ExportImportToggle from "../../molecules/dataThird/ExportImportToggle";
import axios from "axios";

function DataThird() {
  const [exportImportState, setExportImportState] = useState(true);

  const params = useParams();

  const columns = useMemo(
    () => [
      { accessor: "order", Header: "순위" },
      {
        accessor: "nation",
        Header: "국가코드",
        Cell: AvatarCell,
      },
      { accessor: "date", Header: "조회기준" },
      { accessor: "amount", Header: "금액($)" },
      { accessor: "amountPortion", Header: "점유율(금액)" },
      { accessor: "weight", Header: "중량(kg)" },
      { accessor: "weightPortion", Header: "점유율(중량)" },
      { accessor: "hsCode", Header: "품목코드(HS코드)" },
    ],
    []
  );

  ///////여기에서 axios 쓴다
  useEffect(() => {
    axios
      .get(
        "https://98320413-724a-44ba-a0b5-9b226001b6d6.mock.pstmn.io/api/trade/country/data3?" +
          "startDate=" + params.duration.substr(0,6) + "&" +
          "endDate=" + params.duration.substr(7,12)
      )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  const exportImportStateHandler = () => {
    setExportImportState(!exportImportState);
  };

  const data = useMemo(
    () =>
      Array(100)
        .fill()
        .map(() => ({
          order: faker.datatype.number({ min: 1, max: 10 }),
          nation: faker.address.countryCode(),
          // imgSrc:
          //   "./../../../../../assets/nationalFlags/" +
          //   faker.address.countryCode() +
          //   ".gif",
          date: "2022.3 - 2023.3",
          amount: faker.commerce.price(0, 100000000, 0, "$"),
          amountPortion: "11%",
          weight: faker.datatype.number({ min: 100000 }),
          weightPortion: "11%",
          hsCode: "전체품목",
        })),
    []
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex-start" onClick={exportImportStateHandler}>
          <ExportImportToggle
            exportImportState={exportImportState}
            params={params}
          />
        </div>

        <div className="mt-4">
          <Table
            columns={columns}
            data={data}
            exportImportState={exportImportState}
          />
        </div>
      </main>
    </div>
  );
}

export default DataThird;
