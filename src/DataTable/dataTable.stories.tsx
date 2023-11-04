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
        { one: 1, two: 5 },
        { one: 2, two: 3, three: 6 },
        { one: 2, two: 4, three: 6 },
      ]}
    />
  </div>
);
