import styled from "styled-components";

export const ColHeader = styled.div``;

export const ColHeaderContent = styled.div`
  border: 1px solid green;
  display: flex;
  justify-content: space-between;
`;

export const ColFilter = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid green;
  input {
    width: calc(100% - 4px);
    padding: 0;
    border: none;
  }
`;
