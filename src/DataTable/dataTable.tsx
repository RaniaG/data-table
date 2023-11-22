import React, { useCallback, useMemo, useState } from "react";
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
  const [sortState, setSortState] = useState({});
  const [filterState, setFilterState] = useState({});

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
      setSortState(newState);
    },
    [data, sortState, setSortState]
  );
  const onColumnFilter = useCallback(
    (filterValue: string, columnKey: string) => {
      const col = columns.find((e) => e.key == columnKey);
      let newState = { ...filterState };
      if (!filterValue) {
        newState = _.omit(newState, columnKey);
      } else {
        newState[columnKey] = {
          filterValue,
          customFilter: col.customFilter,
        };
      }
      setFilterState(newState);
    },
    [columns, filterState, setFilterState]
  );
  const processedData = useMemo(() => {
    const sortedData = _.orderBy(
      data,
      Object.keys(sortState),
      Object.values(sortState)
    ) as T[];
    return sortedData.filter((row) => {
      return Object.keys(filterState).every((colKey) => {
        return filterState[colKey].customFilter
          ? filterState[colKey].customFilter(row[colKey])
          : row[colKey] &&
              row[colKey]
                .toString()
                .toLowerCase()
                .includes(filterState[colKey].filterValue.toLowerCase());
      });
    });
  }, [filterState, sortState]);
  return (
    <>
      <S.DataTable totalColCount={columns.filter((e) => !e.hide).length}>
        {columns.map((col) => (
          <ColumnHeader
            column={{ ...col, onSort: col.onSort ?? onColumnSort }}
            key={col.key}
            sortState={sortState[col.key]}
            filterState={filterState[col.key]?.filterValue}
            onFilter={(filterValue) => onColumnFilter(filterValue, col.key)}
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
