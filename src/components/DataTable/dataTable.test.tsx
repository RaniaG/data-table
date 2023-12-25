import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { DataTable } from "./dataTable";
import { DataTableColumn } from "../ColumnHeader";

const mockPrimaryPagination = jest.fn();
const mockSecondaryPagination = jest.fn();

jest.mock("../Pagination", () => {
  return {
    PrimaryPagination: (props) => {
      mockPrimaryPagination(props);
      return (
        <div>
          Primary pagination mock
          <input
            type="text"
            data-testid="page-number-input"
            onChange={(e) => props.onPageChange(+e.target.value)}
          />
        </div>
      );
    },
    SecondaryPagination: (props) => {
      mockSecondaryPagination(props);
      return <div>Secondary pagination mock</div>;
    },
  };
});

describe("data table unit tests", () => {
  let mockData;
  let mockColumns: any[];
  beforeEach(() => {
    jest.clearAllMocks();
    mockColumns = [
      { key: "col1", title: "col 1" },
      { key: "col2", title: "col 2" },
      { key: "col3", title: "col 3", hide: true },
    ];
    mockData = [
      { col1: "abc", col2: 2, col3: "col 3 value" },
      { col1: "lma", col2: 1, col3: "col 3 value" },
      { col1: "de", col2: 7 },
      { col1: "xyz", col2: 3 },
      { col1: "fgh", col2: 3 },
    ];
  });
  it("should render data table columns if shown columns are more than 0", () => {
    //Arrange
    //Act
    render(<DataTable columns={mockColumns} data={mockData} />);
    //Assert
    screen.getByTestId("data-table");
    screen.getByText("col 1");
    screen.getByText("col 2");
    screen.getByTestId("data-table");
    expect(screen.queryByText("col 3")).toBeNull();
  });
  it.each([[[{ key: "col3", title: "col 3", hide: true }], []]])(
    "should not render table and should show message if no columns are shown",
    (columns) => {
      //Arrange
      //Act
      render(<DataTable columns={columns} data={mockData} />);
      //Assert
      expect(screen.queryByTestId("data-table")).toBeNull();
      expect(screen.queryByText("col 3")).toBeNull();
      screen.getByText("No Data To Show");
    }
  );
  it("should call customCellRenderer if it has value", () => {
    //Arrange
    const customCellRenderer = jest.fn();
    //Act
    render(
      <DataTable
        columns={mockColumns}
        data={[mockData[0]]}
        customCellRender={customCellRenderer}
      />
    );
    //Assert
    expect(customCellRenderer).toHaveBeenCalledTimes(2);
    expect(customCellRenderer).toHaveBeenNthCalledWith(1, {
      columnId: "col1",
      onClick: expect.anything(),
      rowData: mockData[0],
      rowIndex: 0,
    });
    expect(customCellRenderer).toHaveBeenNthCalledWith(2, {
      columnId: "col2",
      onClick: expect.anything(),
      rowData: mockData[0],
      rowIndex: 0,
    });
  });
  it("should call onCellClick and onRowClick event if cell is clicked", () => {
    //Arrange
    const onCellClick = jest.fn();
    const onRowClick = jest.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        onCellClick={onCellClick}
        onRowClick={onRowClick}
      />
    );
    //Act
    screen.getByText("abc").click();
    //Assert
    expect(onCellClick).toHaveBeenCalledWith("col1", mockData[0]);
    expect(onRowClick).toHaveBeenCalledWith(mockData[0]);
  });
  it("should not show hidden columns", () => {
    //Arrange
    //Act
    render(<DataTable columns={mockColumns} data={mockData} />);
    //Assert
    expect(screen.queryByText("col 3")).toBeNull();
    expect(screen.queryByText("col 3 value")).toBeNull();
  });
  describe("sorting", () => {
    it("should sort data by multiple columns after multiple column headers click", async () => {
      //Arrange
      mockColumns[0].sortable = true;
      mockColumns[1].sortable = true;
      render(<DataTable columns={mockColumns} data={mockData} />);
      //Act
      await fireEvent.click(screen.getByText("col 2"));
      screen.getByText("col 1").click();
      //Assert
      await waitFor(() => {
        expect(
          screen
            .getAllByTestId("data-table-cell-col2")
            .map((e) => e.textContent)
        ).toEqual(["1", "2", "3", "3", "7"]);
        expect(
          screen
            .getAllByTestId("data-table-cell-col1")
            .map((e) => e.textContent)
        ).toEqual(["lma", "abc", "fgh", "xyz", "de"]);
      });
    });
    it("should not sort data if column sortable = false", async () => {
      //Arrange
      render(<DataTable columns={mockColumns} data={mockData} />);
      //Act
      screen.getByText("col 2").click();
      //Assert
      await waitFor(() => {
        expect(
          screen
            .getAllByTestId("data-table-cell-col2")
            .map((e) => e.textContent)
        ).toEqual(["2", "1", "7", "3", "3"]);
      });
    });
    it.each([
      ["asc", 1, [1, 2, 3, 3, 7]],
      ["desc", 2, [7, 3, 3, 2, 1]],
      ["default", 3, [2, 1, 7, 3, 3]],
    ])(
      "should sort column %p after %p click",
      async (sortState: string, numberOfClicks: number, expected: number[]) => {
        //Arrange
        mockColumns[1].sortable = true;
        render(<DataTable columns={mockColumns} data={mockData} />);
        //Act
        for (let index = 1; index <= numberOfClicks; index++) {
          await fireEvent.click(screen.getByText("col 2"));
        }
        //Assert
        await waitFor(() => {
          expect(
            screen
              .getAllByTestId("data-table-cell-col2")
              .map((e) => +e.textContent)
          ).toEqual(expected);
        });
      }
    );
    it("should call column onSort if it has value", async () => {
      //Arrange
      const onSort = jest.fn();
      mockColumns[1].sortable = true;
      mockColumns[1].onSort = onSort;
      render(<DataTable columns={mockColumns} data={mockData} />);
      //Act
      screen.getByText("col 2").click();
      //Assert
      await waitFor(() => {
        expect(onSort).toHaveBeenCalledWith("col2");
      });
    });
  });
  describe("filtering", () => {
    it("should filter data by single column correctly after filter changes", async () => {
      //Arrange
      mockColumns[0].allowFiltering = true;
      render(<DataTable columns={mockColumns} data={mockData} />);
      //Act
      fireEvent.change(screen.getByTestId("input-filter"), {
        target: {
          value: "a",
        },
      });
      //Assert
      await waitFor(() => {
        expect(
          screen
            .getAllByTestId("data-table-cell-col1")
            .map((e) => e.textContent)
        ).toEqual(["abc", "lma"]);
      });
    });
    it("should filter data by multiple columns correctly after filter changes", async () => {
      //Arrange
      mockColumns[0].allowFiltering = true;
      mockColumns[1].allowFiltering = true;

      render(<DataTable columns={mockColumns} data={mockData} />);
      //Act
      await fireEvent.change(screen.getAllByTestId("input-filter")[0], {
        target: {
          value: "a",
        },
      });
      fireEvent.change(screen.getAllByTestId("input-filter")[1], {
        target: {
          value: "1",
        },
      });
      //Assert
      await waitFor(() => {
        expect(
          screen
            .getAllByTestId("data-table-cell-col1")
            .map((e) => e.textContent)
        ).toEqual(["lma"]);
      });
    });
    it("should call column customFilter if it has value on filter value changes", async () => {
      //Arrange
      const customFilter = jest.fn();
      mockColumns[0].allowFiltering = true;
      mockColumns[0].customFilter = customFilter;

      render(<DataTable columns={mockColumns} data={mockData} />);
      //Act
      fireEvent.change(screen.getByTestId("input-filter"), {
        target: {
          value: "ab",
        },
      });
      //Assert
      await waitFor(() => {
        expect(customFilter).toHaveBeenCalledWith(mockData[0]["col1"], "ab");
      });
    });
  });
  describe("pagination", () => {
    it("should not render pagination if pagination is false", () => {
      //Arrange
      //Act
      render(<DataTable columns={mockColumns} data={mockData} />);
      //Assert
      expect(mockPrimaryPagination).not.toHaveBeenCalled();
    });
    it("should render primary pagination if pagination is true", () => {
      //Arrange
      //Act
      render(
        <DataTable columns={mockColumns} data={mockData} pagination={true} />
      );
      //Assert
      expect(mockPrimaryPagination).toHaveBeenCalled();
    });
    it("should render secondary pagination if paginationVariant = secondar", () => {
      //Arrange
      //Act
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          pagination={true}
          paginationVariant="secondary"
        />
      );
      //Assert
      expect(mockPrimaryPagination).not.toHaveBeenCalled();
      expect(mockSecondaryPagination).toHaveBeenCalled();
    });

    it("should invoke customPaginationRenderer and pass correct props if it has value ", () => {
      //Arrange
      const customPaginationRenderer = jest.fn();
      //Act
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          pagination={true}
          customPaginationRenderer={customPaginationRenderer}
        />
      );
      //Assert
      expect(mockPrimaryPagination).not.toHaveBeenCalled();
      expect(mockSecondaryPagination).not.toHaveBeenCalled();
      expect(customPaginationRenderer).toHaveBeenCalled();
    });
    it.each([
      [2, 2, ["de", "xyz"]],
      [3, 1, ["abc", "lma", "de"]],
      [1, 5, ["fgh"]],
    ])(
      "should paginate data according to selected page size: %p and page number %p ",
      async (pageSize: number, currentPage: number, expected: any[]) => {
        //Arrange
        render(
          <DataTable
            columns={mockColumns}
            data={mockData}
            pagination={true}
            initialPageSize={pageSize}
          />
        );
        //Act
        fireEvent.change(screen.getByTestId("page-number-input"), {
          target: {
            value: currentPage,
          },
        });
        //Assert
        await waitFor(() => {
          expect(
            screen
              .getAllByTestId("data-table-cell-col1")
              .map((e) => e.textContent)
          ).toEqual(expected);
        });
      }
    );
  });
});
