import React, { useCallback, useState } from "react";
import { DataTableProps } from "./dataTable.types";
import * as S from "./dataTable.styled";
import { ColumnHeader } from "../ColumnHeader";
import _ from "lodash";
import { Pagination } from "../Pagination/pagination";

export const DataTable = <T extends {}>({
  columns,
  data,
  customPagination,
}: DataTableProps<T>) => {
  const [processedData, setProcessedData] = useState(data);
  const [sortState, setSortState] = useState({});
  const onColumnSort = useCallback(
    (id: string) => {
      if (!columns.find((c) => c.key === id)?.sortable) return;
      let newState = { ...sortState };
      if (sortState[id]) {
        if (sortState[id] === "desc") {
          //reset this column
          newState = _.omit({ ...sortState }, [id]);
        } else if (sortState[id] === "asc") {
          newState = { ...sortState, [id]: "desc" };
        }
      } else {
        newState = { ...sortState, [id]: "asc" };
      }
      const sortedData = _.orderBy(
        data,
        Object.keys(newState),
        Object.values(newState)
      ) as T[];
      setProcessedData(sortedData);
      setSortState(newState);
    },
    [data, processedData, sortState, setSortState, setProcessedData]
  );
  return (
    <>
      <S.DataTable totalColCount={columns.filter((e) => !e.hide).length}>
        {columns.map((col) => (
          <ColumnHeader
            column={{ ...col, onSort: col.onSort ?? onColumnSort }}
            key={col.key}
            sortState={sortState[col.key]}
          />
        ))}
        {processedData.map((row, i) =>
          columns
            .filter((e) => !e.hide)
            .map((cell, j) => (
              <S.Cell key={`${cell.key}_${i}_${j}`}>{row[cell.key]}</S.Cell>
            ))
        )}
      </S.DataTable>
      <Pagination totalNumberOfItems={20} pageSize={2} {...customPagination} />
    </>
  );
};
