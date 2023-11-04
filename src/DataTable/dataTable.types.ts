import { ReactNode } from "react";
import { DataTableColumn } from "../ColumnHeader";

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  horizontalScroll?: boolean;
  sortIcon?: ReactNode;
  pagination?: boolean;
  customPaginationComponent?: boolean;
  fixedHeader?: boolean;
  lazyLoading?: boolean;
  customCellRender?: (columnId: string, rowData: T) => ReactNode | string;
  onCellClick?: (columnId: string, rowData: T) => void;
  onRowClick?: (rowData: T) => void;
}
