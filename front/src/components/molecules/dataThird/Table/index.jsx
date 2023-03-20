import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Button({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

function PageButton({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

function Table({ columns, data, exportImportState }) {
  function frameColor(exportImportState) {
    return exportImportState ? "bg-red-300" : "bg-blue-300";
  }

  // const headList = columns.map((value, key) => (
  //   <th className="px-6 py-3" key={key}>
  //     {value.Header}
  //   </th>
  // ));

  // console.log(data);

  // const dataList = data.map((value, key) => (
  //   <tr>
  //     <td className="px-6 py-3" key={key}>
  //       {value.order}
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       <div>
  //         <div className="flex items-center justify-items-center">
  //           <div className="flex-shrink-0 h-10 w-10">
  //             <img className="mt-2 h-7 w-10 " src={value.imgSrc} alt="" />
  //           </div>
  //           <div className="ml-3">
  //             <div>{value.nation}</div>
  //           </div>
  //         </div>
  //       </div>
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       {value.date}
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       {value.amount}
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       {value.amountPortion}
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       {value.weight}
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       {value.weightPortion}
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       {value.hsCode}
  //     </td>
  //   </tr>
  // ));

  // console.log(dataList);

  // return (
  //   <>
  //     <div className="relative overflow-auto">
  //       <table className="w-full font-mun m-2">
  //         <thead>
  //           <tr>{headList}</tr>
  //         </thead>
  //         <div>
  //           <tbody>{dataList}</tbody>
  //         </div>
  //       </table>
  //     </div>
  //   </>
  // );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
  } = useTable({ columns, data }, useSortBy, usePagination);

  return (
    <>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-blue-800 font-mun"
              >
                <thead className={frameColor(exportImportState)}>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " ▼"
                                : " ▲"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              role="cell"
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className={frameColor(exportImportState)}>
                <div className="py-3 flex items-center justify-between ">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <Button
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      Previous
                    </Button>
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>
                      Next
                    </Button>
                  </div>

                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                    <div className="flex gap-x-2 mr-10">
                      <span className="text-sm text-gray-700">
                        Page{" "}
                        <span className="font-medium">
                          {state.pageIndex + 1}
                        </span>{" "}
                        /{" "}
                        <span className="font-medium">
                          {pageOptions.length}
                        </span>
                      </span>
                      <select
                        className="rounded-md"
                        value={state.pageSize}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value));
                        }}
                      >
                        {[5, 10, 20].map((pageSize) => (
                          <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                      >
                        <PageButton
                          className="rounded-l-md"
                          onClick={() => gotoPage(0)}
                          disabled={!canPreviousPage}
                        >
                          <span className="sr-only">First</span>
                          <ChevronDoubleLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </PageButton>
                        <PageButton
                          onClick={() => previousPage()}
                          disabled={!canPreviousPage}
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </PageButton>
                        <PageButton
                          onClick={() => nextPage()}
                          disabled={!canNextPage}
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </PageButton>
                        <PageButton
                          className="rounded-r-md"
                          onClick={() => gotoPage(pageCount - 1)}
                          disabled={!canNextPage}
                        >
                          <span className="sr-only">Last</span>
                          <ChevronDoubleRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </PageButton>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
