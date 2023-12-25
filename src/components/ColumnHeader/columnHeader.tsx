import React, { useState } from "react";
import { ColumnHeaderProps, DataTableColumn } from "./columnHeader.types";
import * as S from "./columnHeader.styled";
import { SvgChevronDown, SvgChevronUp, SvgFilter } from "../../Icons";

export const ColumnHeader = <T extends {}>({
  column,
  sortState,
  filterState,
  onFilter,
}: ColumnHeaderProps<T>) => {
  const {
    key,
    title,
    sortable,
    allowFiltering,
    customSortIndicator,
    customColumnRenderer,
    customFilterRenderer,
    onSort,
    onClick,
  } = column;
  return customColumnRenderer ? (
    customColumnRenderer(column)
  ) : (
    <S.ColHeader>
      <S.ColHeaderContent
        sortable={sortable}
        data-testid="header"
        onClick={() => {
          onClick?.(key);
          if (sortable) onSort?.(key);
        }}
      >
        {typeof title == "string" ? <span>{title}</span> : title}
        {customSortIndicator ? (
          customSortIndicator({ sortState })
        ) : sortState == "asc" ? (
          <SvgChevronUp data-testid="arrow-up" />
        ) : sortState == "desc" ? (
          <SvgChevronDown data-testid="arrow-down" />
        ) : (
          ""
        )}
      </S.ColHeaderContent>
      {allowFiltering &&
        (customFilterRenderer ? (
          customFilterRenderer({ value: filterState, onChange: onFilter })
        ) : (
          <S.ColFilter>
            <input
              data-testid="input-filter"
              value={filterState}
              onChange={(e) => onFilter(e.target.value)}
            />
            <SvgFilter />
          </S.ColFilter>
        ))}
    </S.ColHeader>
  );
};
