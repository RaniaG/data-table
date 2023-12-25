import { styled } from "styled-components";

export const DataTableContainer = styled.div`
  overflow: hidden;
`;

export const DataTable = styled.div<{ totalColCount: number }>`
  display: grid;
  grid-template-columns: ${({ totalColCount }) =>
    `repeat(${totalColCount}, 200px)`};
  overflow-x: auto;
  margin: 20px;
  justify-content: center;
`;

export const Cell = styled.div`
  padding: 5px 2px;
  border-bottom: 1px solid lightgrey;
`;

export const HeaderDivider = styled.div<{ totalColCount: number }>`
  grid-column: 1 / ${({ totalColCount }) => totalColCount};
  border-bottom: 1px solid darkgrey;
`;
