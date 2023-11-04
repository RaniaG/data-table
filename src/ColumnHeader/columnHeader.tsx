import React, { useState } from "react";
import { ColumnHeaderProps, DataTableColumn } from "./columnHeader.types";
import * as S from "./columnHeader.styled";
import { SvgChevronDown, SvgChevronUp } from "../Icons";

export const ColumnHeader = <T extends {}>({
  column,
  sortState,
}: ColumnHeaderProps<T>) => {
  const { key, title, onSort, onClick } = column;
  return (
    <S.ColHeader
      onClick={() => {
        onClick?.(key);
        onSort?.(key);
      }}
    >
      {typeof title == "string" ? (
        <S.ColHeaderContent>
          <span>{title}</span>
          {sortState == "asc" ? (
            <SvgChevronUp />
          ) : sortState == "desc" ? (
            <SvgChevronDown />
          ) : (
            ""
          )}
        </S.ColHeaderContent>
      ) : (
        title(column)
      )}
    </S.ColHeader>
  );
};
