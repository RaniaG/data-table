import React, { useMemo } from "react";
import { PrimaryPaginationProps } from "./primaryPagination.types";
import * as S from "./primaryPagination.styled";
import _ from "lodash";
import {
  SvgChevronLeft,
  SvgChevronRight,
  SvgDoubleChevronLeft,
  SvgDoubleChevronRight,
} from "@icons";

const PAGINATION_OPTIONS = [5, 10, 15, 25, 50, 100];
export const PrimaryPagination = ({
  totalNumberOfItems,
  currentPage,
  pageSize,
  onPageSizeChange,
  onPageChange,
}: PrimaryPaginationProps) => {
  const pageSizes = useMemo(() => {
    return pageSize && !PAGINATION_OPTIONS.includes(pageSize)
      ? _.sortBy([...PAGINATION_OPTIONS, pageSize])
      : PAGINATION_OPTIONS;
  }, [pageSize]);
  const validPageSize = pageSize ?? PAGINATION_OPTIONS[0];
  const totalPageCount = Math.ceil(totalNumberOfItems / validPageSize);

  return (
    <S.Container>
      <S.PageSizeControls>
        <span>Rows per page:</span>
        <S.PageSizePicker
          value={validPageSize}
          onChange={(e) => onPageSizeChange(+e.target.value)}
          data-testid="page-size-select"
        >
          {pageSizes.map((e) => (
            <S.PageSizeOption
              key={`page_size_${e}`}
              data-testid={`page-size-option`}
            >
              {e}
            </S.PageSizeOption>
          ))}
        </S.PageSizePicker>
      </S.PageSizeControls>
      <S.TotalCount>
        {Math.min(
          currentPage * validPageSize - validPageSize + 1,
          totalNumberOfItems
        )}{" "}
        - {Math.min(currentPage * validPageSize, totalNumberOfItems)} of{" "}
        {totalNumberOfItems}
      </S.TotalCount>
      <S.ButtonControls>
        <S.ArrowButton
          data-testid="left-double-chevron"
          disabled={totalPageCount <= 1 || currentPage == 1}
          onClick={() => onPageChange(1)}
        >
          <SvgDoubleChevronLeft />
        </S.ArrowButton>
        <S.ArrowButton
          data-testid="left-chevron"
          disabled={totalPageCount <= 1 || currentPage == 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <SvgChevronLeft />
        </S.ArrowButton>
        <S.PageInput
          value={currentPage}
          onChange={(e) => onPageChange(+e.target.value)}
        >
          {Array(totalPageCount)
            .fill(0)
            .map((e, i) => (
              <S.PageSizeOption key={`page_number_${i + 1}`}>
                {i + 1}
              </S.PageSizeOption>
            ))}
        </S.PageInput>
        <S.ArrowButton
          data-testid="right-chevron"
          disabled={totalPageCount <= 1 || currentPage == totalPageCount}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <SvgChevronRight />
        </S.ArrowButton>
        <S.ArrowButton
          data-testid="right-double-chevron"
          disabled={totalPageCount <= 1 || currentPage == totalPageCount}
          onClick={() => onPageChange(totalPageCount)}
        >
          <SvgDoubleChevronRight />
        </S.ArrowButton>
      </S.ButtonControls>
    </S.Container>
  );
};
