export interface SecondaryPaginationProps {
  totalNumberOfItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}
