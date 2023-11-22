import React, { useState } from "react";
import { ColumnHeaderProps, DataTableColumn } from "./columnHeader.types";
import * as S from "./columnHeader.styled";
import { SvgChevronDown, SvgChevronUp, SvgFilter } from "../Icons";

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
    onSort,
    onClick,
  } = column;
  return customColumnRenderer ? (
    customColumnRenderer(column)
  ) : (
    <S.ColHeader>
      <S.ColHeaderContent
        onClick={() => {
          onClick?.(key);
          if (sortable) onSort?.(key);
        }}
      >
        {typeof title == "string" ? <span>{title}</span> : title}
        {customSortIndicator ? (
          customSortIndicator({ sortState })
        ) : sortState == "asc" ? (
          <SvgChevronUp />
        ) : sortState == "desc" ? (
          <SvgChevronDown />
        ) : (
          ""
        )}
      </S.ColHeaderContent>
      {allowFiltering && (
        <S.ColFilter>
          <input
            value={filterState}
            onChange={(e) => onFilter(e.target.value)}
          />
          <SvgFilter />
        </S.ColFilter>
      )}
    </S.ColHeader>
  );
};
