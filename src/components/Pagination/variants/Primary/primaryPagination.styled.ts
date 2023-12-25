import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
  align-items: center;
`;

export const PageSizeControls = styled.div``;
export const PageSizePicker = styled.select`
  padding: 5px;
  margin-left: 10px;
  border-radius: 40px;
  &:hover {
    cursor: pointer;
  }
`;
export const PageSizeOption = styled.option``;

export const TotalCount = styled.div`
  margin: 20px 40px;
  vertical-align: middle;
  display: flex;
  align-items: center;
`;
export const ButtonControls = styled.div`
  display: flex;
  align-items: center;
`;

export const ArrowButton = styled.button`
  border: none;
  background-color: transparent;
  &:hover:not(:disabled) {
    background-color: #f6f9fc;
    border-radius: 50%;
    cursor: pointer;
  }
  margin: 0 5px;
  &:disabled {
    path {
      stroke: #1010104d;
    }
  }
`;

export const PageInput = styled.select`
  min-width: 40px;
  padding: 5px;
  border-radius: 40px;
  &:hover {
    cursor: pointer;
  }
`;
