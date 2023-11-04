import React, { useState } from "react";
import { ColumnHeaderProps, DataTableColumn } from "./columnHeader.types";
import * as S from "./columnHeader.styled";

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
        <>
          {sortState == "asc" ? ">" : sortState == "desc" ? "<" : ""}
          {title}
        </>
      ) : (
        title(column)
      )}
    </S.ColHeader>
  );
};
