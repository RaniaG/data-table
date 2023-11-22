export interface DataTableColumn<T> {
  key: string;
  title: string | React.ReactNode;
  hide?: boolean;
  sortable?: boolean;
  allowFiltering?: boolean;
  customColumnRenderer?: React.FC<DataTableColumn<T>>;
  customSortIndicator?: React.FC<{ sortState: "asc" | "desc" | undefined }>;
  customFilter?: (cellValue: T, filterValue: string) => boolean;
  onClick?: (id: string) => void;
  onSort?: (id: string) => void;
}

export interface ColumnHeaderProps<T> {
  column: DataTableColumn<T>;
  sortState?: "asc" | "desc" | undefined;
  filterState?: string;
  onFilter?: (filterValue: string) => void;
}
