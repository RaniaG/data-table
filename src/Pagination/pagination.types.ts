export interface PaginationProps extends CustomPaginationProps {
  totalNumberOfItems: number;
  pageSize: number;
}

export interface CustomPaginationProps {
  customPageNumberRenderer?: React.FC<{
    pageNumber: number | "...";
    isActive: boolean;
    onClick: () => void;
  }>;
  customStartArrowRenderer?: React.FC<{
    disabled: boolean;
    onClick: () => void;
  }>;
  customEndArrowRenderer?: React.FC<{
    disabled: boolean;
    onClick: () => void;
  }>;
  onPageChange?: (pageNumber: number) => void;
}
