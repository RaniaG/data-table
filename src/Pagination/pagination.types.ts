export interface PaginationProps extends CustomPaginationProps {
  totalNumberOfItems: number;
  pageSize: number;
}

export interface CustomPaginationProps {
  customPageNumberRenderer?: React.FC<{ isActive: boolean }>;
  customStartArrowRenderer?: React.FC<{ disabled: boolean }>;
  customEndArrowRenderer?: React.FC<{ disabled: boolean }>;
  onPageSizeChange?: (pageSize: number) => void;
  onPageChange?: (pageNumber: number) => void;
}
