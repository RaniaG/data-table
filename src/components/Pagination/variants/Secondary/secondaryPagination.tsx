import React, { useCallback, useMemo, useState } from "react";
import { SecondaryPaginationProps } from "./secondaryPagination.types";
import * as S from "./secondaryPagination.styled";
import { SvgChevronLeft, SvgChevronRight } from "@icons";
import { inRange } from "lodash";

export const SecondaryPagination = ({
  totalNumberOfItems,
  pageSize,
  currentPage,
  onPageChange,
}: SecondaryPaginationProps) => {
  const totalPageCount = Math.ceil(totalNumberOfItems / pageSize);

  const paginationRange = useMemo(() => {
    const result = [];
    result.push(1);
    if (totalPageCount > 3) {
      const leftSibling = currentPage - 1;
      const rightSibling = currentPage + 1;
      if (leftSibling - 1 > 1) result.push("...");
      if (leftSibling > 1) result.push(leftSibling);
      if (currentPage > 1 && currentPage < totalPageCount)
        result.push(currentPage);
      if (rightSibling < totalPageCount) result.push(rightSibling);
      if (rightSibling + 1 < totalPageCount) result.push("...");
    } else {
      for (let i = 2; i <= totalPageCount - 1; i++) {
        result.push(i);
      }
    }
    result.push(totalPageCount);
    return result;
  }, [totalNumberOfItems, pageSize, currentPage]);

  const onPageChanged = useCallback(
    (p) => {
      if (Number(p) && inRange(p, 1, totalPageCount + 1)) {
        onPageChange?.(p);
      }
    },
    [currentPage, totalPageCount, onPageChange]
  );

  return (
    <S.PaginationContainer>
      <S.PageButton
        disabled={currentPage == 1}
        onClick={() => onPageChanged(currentPage - 1)}
      >
        <SvgChevronLeft />
      </S.PageButton>
      {paginationRange.map((p, i) => {
        return Number(p) ? (
          <S.PageButton
            key={`page_${p}`}
            disabled={p == currentPage}
            onClick={() => onPageChanged(p)}
          >
            {p}
          </S.PageButton>
        ) : (
          <span key={`page_dots_${i}`}>{p}</span>
        );
      })}
      <S.PageButton
        disabled={currentPage == totalPageCount}
        onClick={() => onPageChanged(currentPage + 1)}
      >
        <SvgChevronRight />
      </S.PageButton>
    </S.PaginationContainer>
  );
};
