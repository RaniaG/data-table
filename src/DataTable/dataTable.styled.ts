import { styled } from "styled-components";
export const DataTable = styled.div<{ totalColCount: number }>`
  display: grid;
  grid-template-columns: ${({ totalColCount }) =>
    `repeat(${totalColCount}, 200px)`};
  overflow-x: auto;
  border: 1px solid red;
`;

export const Cell = styled.div``;
