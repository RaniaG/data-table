import { ReactNode } from "react";
import { DataTableColumn } from "../ColumnHeader";

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  pagination?: boolean;
  paginationVariant?: "primary" | "secondary";
  initialPageSize?: number;
  customCellRender?: (data: {
    columnId: string;
    rowData: T;
    rowIndex: number;
    onClick: () => void;
  }) => ReactNode | string;
  customPaginationRenderer?: React.FC<{
    pageNumber: number;
    pageSize: number;
    onPageChange: (pageNumber: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  }>;
  onCellClick?: (columnId: string, rowData: T) => void;
  onRowClick?: (rowData: T) => void;
}
