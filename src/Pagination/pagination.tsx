import React, { useMemo, useState } from "react";
import { PaginationProps } from "./pagination.types";
import * as S from "./pagination.styled";
import { SvgChevronLeft, SvgChevronRight } from "../Icons";

export const Pagination = ({
  totalNumberOfItems,
  pageSize,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(5);
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
  return (
    <S.PaginationContainer>
      <S.Arrow
        disabled={currentPage == 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <SvgChevronLeft />
      </S.Arrow>
      {paginationRange.map((p, i) =>
        Number(p) ? (
          <S.Page
            key={`page_${p}`}
            disabled={p == currentPage}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </S.Page>
        ) : (
          <span key={`page_dots_${i}`}>{p}</span>
        )
      )}
      <S.Arrow
        disabled={currentPage == totalPageCount}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <SvgChevronRight />
      </S.Arrow>
    </S.PaginationContainer>
  );
};
