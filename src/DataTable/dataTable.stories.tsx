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
          title: "One",
        },
        {
          key: "two",
          title: "Two",
        },
        {
          key: "three",
          title: "Three",
        },
      ]}
      data={[
        { one: "abc", two: "def" },
        { one: "cde", two: "hyg", three: "Three" },
      ]}
    />
  </div>
);
