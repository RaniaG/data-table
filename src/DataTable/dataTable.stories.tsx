import React from "react";
import { DataTable } from "./dataTable";

export default {
  title: "DataTable",
};

export const DefaultTable = () => (
  <div style={{ maxWidth: "500px" }}>
    <DataTable
      columns={[
        {
          key: "one",
          title: <h2>Custom Title and Sort Indicator Only</h2>,
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
                width="1em"
                height="1em"
              >
                <g stroke="#0D0D0D" fill="#0D0D0D">
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
                width="1em"
                height="1em"
              >
                <g stroke="#0D0D0D" fill="#0D0D0D">
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
          title: "Custom column Renderer",
          sortable: true,
          customColumnRenderer: ({ key, title, onSort }) => (
            <div style={{ color: "red" }} onClick={() => onSort?.(key)}>
              {title}
            </div>
          ),
        },
        {
          key: "three",
          title: "Default settings",
          sortable: false,
          allowFiltering: true,
        },
      ]}
      data={[
        { one: 1, two: 5 },
        { one: 2, two: 3, three: "a" },
        { one: 2, two: 4, three: "b" },
      ]}
      customPagination={{
        customPageNumberRenderer: ({ pageNumber, isActive }) => {
          return (
            <button style={{ backgroundColor: isActive ? "red" : "grey" }}>
              {pageNumber}
            </button>
          );
        },
        customStartArrowRenderer: ({ disabled, onClick }) => (
          <button onClick={() => onClick()}>{"<"}</button>
        ),
        customEndArrowRenderer: ({ disabled, onClick }) => (
          <button onClick={() => onClick()}>{">"}</button>
        ),
      }}
    />
  </div>
);
