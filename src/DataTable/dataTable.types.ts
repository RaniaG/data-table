import { ReactNode } from "react";
import { DataTableColumn } from "../ColumnHeader";
import { CustomPaginationProps } from "../Pagination";

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  horizontalScroll?: boolean;
  sortIcon?: ReactNode;
  pagination?: boolean;
  fixedHeader?: boolean;
  lazyLoading?: boolean;
  customPagination?: CustomPaginationProps;
  customCellRender?: (columnId: string, rowData: T) => ReactNode | string;
  onCellClick?: (columnId: string, rowData: T) => void;
  onRowClick?: (rowData: T) => void;
}
