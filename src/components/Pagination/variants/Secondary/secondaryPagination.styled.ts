import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PageButton = styled.button`
  padding: 10px;
  background-color: transparent;
  outline: none;
  border: 1px solid gray;
  border-radius: 4px;
  margin: 0 2px;
  &:hover {
    cursor: pointer;
    &:not(:disabled) {
      background-color: lightgray;
    }
  }
  &:disabled {
    path {
      stroke: #1010104d;
    }
  }
`;
