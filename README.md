# React-Data-Table
React Data Table is a component that provides a structured grid layout where data can be presented in rows and columns, offering features such as sorting, filtering, and pagination for efficient data management.<br>
It allows customization for columns, cells, filtering, and pagination functionalities.

## Key Features
- Pagination
- Sorting 
- Filtering
- Filtering Customisation
- Pagination Customisation
- Cell Customisation
- Selectable Cells and Rows
- Responsive

## Installation:
TBD

### Basic Example:

```javascript
  const columns: [
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
  ];
  const data =  [
    { one: 1, two: 5, four: 6 },
    { one: 2, two: 3, three: "a", four: 2 },
    { one: 2, two: 4, three: "b", four: 10 },
    { one: 2, two: 4, three: "b", four: 10 },
  ];
<DataTable columns={columns} data={data} />

```

## Props:

### Data table props:

<table>
<td>Field  </td><td> Data Type </td><td> Required </td><td> Default value  </td><td> Description </td>
<tr><td>  data  </td><td> 
  
  `
  T[]
  `
  
  </td><td> yes </td><td> - </td><td> the data which is used to fill the rows, each object represents a row </td></tr>
<tr><td>  columns</td><td> 
  
  `DataTableColumn[]`
  
  </td><td> yes </td><td> -  </td><td> the column definitions which are used for table header  </td></tr>
<tr><td>  pagination</td><td> 
  
  `Boolean` 
  
  </td><td> false </td><td> false  </td><td> flag to allow pagination  </td></tr>
<tr><td>  paginationVariant</td><td> 
  
  `'primary'` \| `'secondary'` 
  
  </td><td> false </td><td> 
  
  `'primary'` 
  
  </td><td> controls which pagination component to be used  </td></tr>
<tr><td> initialPageSize</td><td> 
  
  `number` 
  
  </td><td> no </td><td> 5 </td><td> the page size used for the pagination </td></tr>
<tr><td> onCellClick</td><td> 
  
  `(columnId: string, rowData: T) => void;` 
  
  </td><td> no </td><td> - </td><td> a callback which is invoked when a cell is clicked </td></tr>
<tr><td> onRowClick</td><td> 
  
  `(rowData: T) => void;` 
  
  </td><td> no </td><td> - </td><td> a callback which is invoked when a row is clicked </td></tr>
  <tr><td>customCellRender</td>
<td>

 `
(data: {
    columnId: string;
    rowData: T;
    rowIndex: number;
    onClick: () => void;
  }) => ReactNode </td><td> string;
  ` 

  </td>
<td> no </td><td> - </td><td> a function used to render each cell in data table </td>
<tr>
<tr><td>customPaginationRenderer</td>
<td>

 `
React.FC<{
    pageNumber: number;
    pageSize: number;
    onPageChange: (pageNumber: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  }>
  ` 

  </td>
<td> no </td><td> - </td><td> a function component used to render custom pagination component </td>
<tr>


</table>

### Column props:
<table>
  <tr>
    <td>Field </td><td> Data Type </td><td> Required </td><td> Default value  </td><td> Description </td>
  </tr>
  <tr><td>  key  </td><td> 
  
  `
  string
  `
  
  </td><td> yes </td><td> - </td><td> The key which is used to map the column to the data row, the same key should exist in the data </td></tr>
  <tr><td>  title  </td><td> 
  
  `
  string | React.ReactNode
  `
  
  </td><td> yes </td><td> - </td><td> The title which is displayed for the column header  </td></tr>
  
  <tr><td>  hide  </td><td> 
  
  `
  boolean
  `
  
  </td><td> no </td><td> false </td><td> determines if the column to be visible or not </td></tr>
<tr><td>  allowFiltering  </td><td> 
  
  `
  boolean
  `
  
  </td><td> no </td><td> false </td><td> shows the filter for the column </td></tr>
<tr><td>  onClick  </td><td> 
  
  `
  (id: string) => void
  `
  
  </td><td> no </td><td> - </td><td> a callback which is invoked when column header is clicked</td></tr>
<tr><td>  onSort  </td><td> 
  
  `
  (id: string) => void
  `
  
  </td><td> no </td><td> - </td><td> a callback which is invoked when column is sorted</td></tr>
<tr><td>  customFilter  </td><td> 
  
  `
  (cellValue: any, filterValue: string) => boolean
  `
  
  </td><td> no </td><td> - </td><td> a callback which is called when filtering is applied to a column, it is called when filter value changes for the column, it is applied to each cell in the column.</td></tr>
<tr><td>  customColumnRenderer  </td><td> 
  
  `
  React.FC<DataTableColumn<T>>
  `
  
  </td><td> no </td><td> - </td><td> a function component which is displayed in place of column header.</td></tr>
<tr><td>  customSortIndicator  </td><td> 
  
  `
  React.FC<{ sortState: "asc" | "desc" | undefined }>
  `
  
  </td><td> no </td><td> - </td><td> a function component which is displayed to customize the sorting icon which is displayed in different sorting states.</td></tr>
<tr><td>  customFilterRenderer  </td><td> 
  
  `
  React.FC<{
    value: string;
    onChange: (value: string) => void;
  }>
  `
  
  </td><td> no </td><td> - </td><td> a function component which is displayed to customise the filter component.</td></tr>

  
  </table>
