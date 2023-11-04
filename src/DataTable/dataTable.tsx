import React from "react";
import { DataTableProps } from "./dataTable.types";
import * as S from "./dataTable.styled";
import { ColumnHeader } from "../ColumnHeader";

export const DataTable = <T extends {}>({
  columns,
  data,
}: DataTableProps<T>) => {
  return (
    <S.DataTable totalColCount={columns.filter((e) => !e.hide).length}>
      {columns.map((col) => (
        <ColumnHeader {...col} />
      ))}
      {data.map((row) =>
        columns.map((cell) => <S.Cell>{row[cell.key]}</S.Cell>)
      )}
    </S.DataTable>
  );
};
