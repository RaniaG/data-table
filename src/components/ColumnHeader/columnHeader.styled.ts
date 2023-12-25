import styled from "styled-components";

export const ColHeader = styled.div``;

export const ColHeaderContent = styled.div<{ sortable }>`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 10px 0;
  &:hover {
    ${({ sortable }) => sortable && `cursor:pointer;`}
  }
`;

export const ColFilter = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid darkGray;
  border-radius: 3px;
  margin: 5px 2px 10px 2px;
  input {
    width: calc(100% - 4px);
    padding: 0;
    border: none;
    &:focus-visible {
      outline: none;
    }
  }
`;
