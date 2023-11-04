export interface DataTableColumn<T> {
  key: string;
  title: string | React.ReactNode;
  hide?: boolean;
  sortable?: boolean;
  fixed?: boolean;
  customColumnRenderer?: React.FC<DataTableColumn<T>>;
  customSortIndicator?: React.FC<{ sortState: "asc" | "desc" | undefined }>;
  sortFunction?: (x: T, y: T) => 0 | 1 | -1;
  onClick?: (id: string) => void;
  onSort?: (id: string) => void;
}

export interface ColumnHeaderProps<T> {
  column: DataTableColumn<T>;
  sortState?: "asc" | "desc" | undefined;
}
