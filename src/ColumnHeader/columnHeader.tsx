import React from "react";
import { DataTableColumn } from "./columnHeader.types";
import * as S from "./columnHeader.styled";

export const ColumnHeader = <T extends {}>(col: DataTableColumn<T>) => {
  const { key, title } = col;
  const sortColumn = () => {};
  return (
    <S.ColHeader
      onClick={() => {
        col.onClick(key);
        sortColumn();
      }}
    >
      {typeof title == "string" ? title : title(col)}
    </S.ColHeader>
  );
};
