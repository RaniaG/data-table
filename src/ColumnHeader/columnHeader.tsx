import React, { useState } from "react";
import { ColumnHeaderProps, DataTableColumn } from "./columnHeader.types";
import * as S from "./columnHeader.styled";
import { SvgChevronDown, SvgChevronUp } from "../Icons";

export const ColumnHeader = <T extends {}>({
  column,
  sortState,
}: ColumnHeaderProps<T>) => {
  const {
    key,
    title,
    customSortIndicator,
    onSort,
    onClick,
    customColumnRenderer,
  } = column;
  return customColumnRenderer ? (
    customColumnRenderer(column)
  ) : (
    <S.ColHeader
      onClick={() => {
        onClick?.(key);
        onSort?.(key);
      }}
    >
      <S.ColHeaderContent>
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
    </S.ColHeader>
  );
};
