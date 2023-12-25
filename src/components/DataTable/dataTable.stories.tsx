import { Meta, StoryObj } from "storybook";
import React from "react";
import { DataTable } from "./dataTable";
import { DataTableProps } from "./dataTable.types";

const meta: Meta<typeof DataTable> = {
  title: "DataTable",
  component: DataTable,
  argTypes: {
    onCellClick: { action: "Cell Clicked" },
    onRowClick: { action: "Row Clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const DefaultTable: Story = (props) => <DataTable {...props} />;
DefaultTable.args = {
  pagination: true,
  columns: [
    {
      key: "one",
      title: "One",
      sortable: true,
    },
    {
      key: "two",
      title: "Two",
    },
    {
      key: "three",
      title: "Three",
      sortable: false,
      allowFiltering: true,
    },
  ],
  data: [
    { one: 1, two: 5, four: 6 },
    { one: 2, two: 3, three: "a", four: 2 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
  ],
  paginationVariant: "primary",
};

export const ColumnCustomizations: Story = (props) => <DataTable {...props} />;

ColumnCustomizations.args = {
  pagination: false,
  columns: [
    {
      key: "four",
      title: <span style={{ color: "blue" }}>Custom title</span>,
    },
    {
      key: "one",
      title: "Custom sort indicator",
      sortable: true,
      customSortIndicator: ({ sortState }) => {
        return sortState === "asc" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
            enableBackground="new 0 0 24 24"
            width="1.3em"
            height="1.3em"
          >
            <g stroke="magenta" fill="#0D0D0D">
              <polyline
                vectorEffect="non-scaling-stroke"
                points="20.5,11.1 12,2.6 3.5,11.1"
                fill="none"
                strokeLinecap="round"
              />
              <line
                vectorEffect="non-scaling-stroke"
                x1={12}
                y1={2.6}
                x2={12}
                y2={21.4}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        ) : sortState == "desc" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
            enableBackground="new 0 0 24 24"
            width="1.3em"
            height="1.3em"
          >
            <g stroke="magenta" fill="#0D0D0D">
              <polyline
                vectorEffect="non-scaling-stroke"
                points="3.5,12.9 12,21.4 20.5,12.9  "
                fill="none"
                strokeLinecap="round"
              />
              <line
                vectorEffect="non-scaling-stroke"
                x1={12}
                y1={21.4}
                x2={12}
                y2={2.6}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        ) : (
          ""
        );
      },
    },
    {
      key: "two",
      title: "Custom header component",
      customColumnRenderer: ({ key, title, onSort }) => (
        <div
          style={{
            border: "1px solid green",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "green",
          }}
        >
          <span>{title}</span>
        </div>
      ),
    },
    {
      key: "three",
      title: "Custom filter function (greater than)",
      allowFiltering: true,
      customFilter: (cellValue, filterValue) => +filterValue < +cellValue,
    },
    {
      key: "four",
      title: "Hidden column",
      hide: true,
    },
    {
      key: "four",
      title: "Custom filter component",
      allowFiltering: true,
      customFilterRenderer: ({ value, onChange }) => (
        <input
          style={{
            border: "2px solid pink",
            width: "100%",
            borderRadius: "10px",
          }}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ),
    },
  ],
  data: [
    { one: 1, two: 5, four: 6 },
    { one: 2, two: 3, three: 1, four: 2 },
    { one: 2, two: 4, three: 3, four: 10 },
    { one: 2, two: 4, three: 5, four: 10 },
    { one: 2, two: 4, three: 6, four: 10 },
  ],
};

export const RowCustomizations: Story = (props) => <DataTable {...props} />;
RowCustomizations.args = {
  pagination: false,
  columns: [
    {
      key: "one",
      title: "One",
      sortable: true,
    },
    {
      key: "two",
      title: "Two",
    },
    {
      key: "three",
      title: "Three",
    },
  ],
  data: [
    { one: 1, two: 5, four: 6 },
    { one: 2, two: 3, three: 1, four: 2 },
    { one: 2, two: 4, three: 3, four: 10 },
    { one: 2, two: 4, three: 5, four: 10 },
    { one: 2, two: 4, three: 6, four: 10 },
  ],
  customCellRender: (data) => {
    const { columnId, rowData, rowIndex, onClick } = data;
    return (
      <div
        style={{
          color: columnId == "one" ? "red" : "blue",
          backgroundColor: rowIndex % 2 == 0 ? "lightcyan" : "white",
          padding: "10px 5px",
        }}
        onClick={() => {
          onClick();
        }}
      >
        {rowData[columnId]}
      </div>
    );
  },
};

export const PaginationCustomization: Story = (props) => {
  return <DataTable {...props} />;
};

PaginationCustomization.args = {
  pagination: true,
  columns: [
    {
      key: "one",
      title: "One",
      sortable: true,
    },
    {
      key: "two",
      title: "Two",
    },
    {
      key: "three",
      title: "Three",
    },
  ],
  data: [
    { one: 1, two: 5, four: 6 },
    { one: 2, two: 3, three: 1, four: 2 },
    { one: 3, two: 4, three: 3, four: 10 },
    { one: 4, two: 4, three: 5, four: 10 },
    { one: 5, two: 4, three: 6, four: 10 },
    { one: 6, two: 4, three: 6, four: 10 },
    { one: 7, two: 4, three: 6, four: 10 },
    { one: 8, two: 4, three: 6, four: 10 },
    { one: 9, two: 4, three: 6, four: 10 },
    { one: 10, two: 4, three: 6, four: 10 },
    { one: 11, two: 4, three: 6, four: 10 },
    { one: 12, two: 4, three: 6, four: 10 },
  ],
  customPaginationRenderer: ({ pageSize, pageNumber, onPageChange }) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button
        style={{
          backgroundColor: "transparent",
          borderRadius: "10px",
          margin: "0 20px",
          padding: "0 10px",
        }}
        disabled={pageNumber == 1}
        onClick={() => onPageChange(pageNumber - 1)}
      >
        Prev
      </button>
      {pageNumber} of {Math.ceil(12 / pageSize)}
      <button
        style={{
          backgroundColor: "transparent",
          borderRadius: "10px",
          margin: "0 20px",
          padding: "0 10px",
        }}
        disabled={pageNumber == Math.ceil(12 / pageSize)}
        onClick={() => onPageChange(pageNumber + 1)}
      >
        Next
      </button>
    </div>
  ),
};
