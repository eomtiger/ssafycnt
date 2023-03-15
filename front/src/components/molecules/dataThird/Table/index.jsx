import React from "react";
import { useTable, useSortBy } from "react-table";

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-blue-800 font-mun"
      >
        <thead className="bg-blue-300">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()} className="divide-y h-96">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} role="cell">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;

export function AvatarCell({ value }) {
  const imgSrc = "./../../../../../assets/nationalFlags/" + value + ".gif";
  return (
    <div className="flex items-center justify-items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img className="mt-2 h-7 w-10 " src={imgSrc} alt="" />
      </div>
      <div className="ml-3">
        <div>{value}</div>
      </div>
    </div>
  );
}
