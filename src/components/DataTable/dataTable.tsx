import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DataTableProps } from "./dataTable.types";
import * as S from "./dataTable.styled";
import { ColumnHeader } from "../ColumnHeader";
import _ from "lodash";
import {
  PAGE_SIZE,
  PrimaryPagination,
  SecondaryPagination,
} from "../Pagination";

export const DataTable = <T extends {}>({
  columns,
  data,
  pagination,
  paginationVariant,
  initialPageSize,
  customPaginationRenderer,
  customCellRender,
  onCellClick,
  onRowClick,
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortState, setSortState] = useState({});
  const [filterState, setFilterState] = useState({});
  const [pageSize, setCurrentPageSize] = useState(initialPageSize ?? PAGE_SIZE);

  const visibleColumnsCount = useMemo(
    () => columns.filter((e) => !e.hide).length,
    [columns]
  );
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
    const filteredAndSortedData = sortedData.filter((row) => {
      return Object.keys(filterState).every((colKey) => {
        return filterState[colKey].customFilter
          ? filterState[colKey].customFilter(
              row[colKey],
              filterState[colKey].filterValue
            )
          : row[colKey] &&
              row[colKey]
                .toString()
                .toLowerCase()
                .includes(filterState[colKey].filterValue.toLowerCase());
      });
    });

    const paginatedData = pagination
      ? filteredAndSortedData.slice(
          currentPage * pageSize - pageSize,
          currentPage * pageSize
        )
      : filteredAndSortedData;

    return paginatedData;
  }, [data, filterState, sortState, currentPage, pageSize]);

  const renderPagination = useCallback(() => {
    if (customPaginationRenderer) {
      return customPaginationRenderer({
        pageNumber: currentPage,
        pageSize,
        onPageChange: (p) => setCurrentPage(p),
        onPageSizeChange: (p) => setCurrentPageSize(p),
      });
    } else if (paginationVariant == "secondary") {
      return (
        <SecondaryPagination
          totalNumberOfItems={data.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={(p) => setCurrentPage(p)}
        />
      );
    } else {
      return (
        <PrimaryPagination
          totalNumberOfItems={data.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={(p) => setCurrentPage(p)}
          onPageSizeChange={(p) => setCurrentPageSize(p)}
        />
      );
    }
  }, [
    data,
    customPaginationRenderer,
    paginationVariant,
    pageSize,
    currentPage,
    setCurrentPage,
    setCurrentPageSize,
  ]);

  useEffect(() => {
    setCurrentPageSize(initialPageSize ?? pageSize);
  }, [initialPageSize]);

  return columns.filter((e) => !e.hide).length > 0 ? (
    <>
      <S.DataTableContainer>
        <S.DataTable
          totalColCount={visibleColumnsCount}
          data-testid="data-table"
        >
          <S.HeaderDivider totalColCount={visibleColumnsCount + 1} />
          {columns
            .filter((e) => !e.hide)
            .map((col) => (
              <ColumnHeader
                column={{ ...col, onSort: col.onSort ?? onColumnSort }}
                key={col.key}
                sortState={sortState[col.key]}
                filterState={filterState[col.key]?.filterValue}
                onFilter={(filterValue) => onColumnFilter(filterValue, col.key)}
              />
            ))}
          <S.HeaderDivider totalColCount={visibleColumnsCount + 1} />
          {processedData.map((row, i) =>
            columns
              .filter((e) => !e.hide)
              .map((col, j) =>
                customCellRender ? (
                  customCellRender({
                    columnId: col.key,
                    rowData: row,
                    rowIndex: i,
                    onClick: () => {
                      onCellClick?.(col.key, row);
                      onRowClick?.(row);
                    },
                  })
                ) : (
                  <S.Cell
                    key={`${col.key}_${i}_${j}`}
                    onClick={() => {
                      onCellClick?.(col.key, row);
                      onRowClick?.(row);
                    }}
                    data-testid={`data-table-cell-${col.key}`}
                  >
                    {row[col.key]}
                  </S.Cell>
                )
              )
          )}
        </S.DataTable>
        {pagination && renderPagination()}
      </S.DataTableContainer>
    </>
  ) : (
    <span>No Data To Show</span>
  );
};
