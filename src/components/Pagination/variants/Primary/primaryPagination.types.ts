export interface PrimaryPaginationProps {
  totalNumberOfItems: number;
  currentPage: number;
  pageSize: number | undefined;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}
