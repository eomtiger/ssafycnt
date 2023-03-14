import { useMemo } from "react";
import { faker } from "@faker-js/faker";
import Table from "../../molecules/dataThird/Table/Table";
import { AvatarCell } from "../../molecules/dataThird/Table/Table";

faker.seed(100);
faker.locale = "ko";

function DataThird() {
  const columns = useMemo(
    () => [
      {
        accessor: "nation",
        Header: "국가코드",
        Cell: AvatarCell,
      },
      { accessor: "date", Header: "조회기준" },
      { accessor: "amount", Header: "수입금액($)" },
      { accessor: "amountPortion", Header: "점유율(금액)" },
      { accessor: "weight", Header: "수입중량(kg)" },
      { accessor: "weightPortion", Header: "점유율(중량)" },
      { accessor: "hsCode", Header: "품목코드HS코드" },
    ],
    []
  );

  const data = useMemo(
    () =>
      Array(100)
        .fill()
        .map(() => ({
          nation: faker.address.countryCode(),
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
    <div className=" text-gray-900">
      <div className="mt-4">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}

export default DataThird;
