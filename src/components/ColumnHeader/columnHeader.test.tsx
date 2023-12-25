import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ColumnHeader } from "./columnHeader";

describe("Column Header unit tests", () => {
  it("should render title", () => {
    //Arrange
    //Act
    render(
      <ColumnHeader
        column={{
          key: "key",
          title: "title",
        }}
      />
    );
    //Assert
    screen.getByText("title");
  });
  it("should call customColumnRenderer if it has value and pass props", () => {
    //Arrange
    const customColumnRenderer = jest.fn((column) => <div>Custom column</div>);
    //Act
    render(
      <ColumnHeader
        column={{
          key: "key",
          title: "title",
          customColumnRenderer,
        }}
      />
    );
    //Assert
    expect(customColumnRenderer).toHaveBeenCalledTimes(1);
    expect(customColumnRenderer).toHaveBeenCalledWith(
      expect.objectContaining({ key: "key", title: "title" })
    );
    expect(screen.queryByText("title")).toBeNull();
  });
  it("should call onClick when clicked", () => {
    //Arrange
    const onClick = jest.fn();
    const onSort = jest.fn();

    render(
      <ColumnHeader
        column={{
          key: "key",
          title: "title",
          onClick,
          onSort,
        }}
      />
    );
    //Act
    screen.getByText("title").click();
    //Assert
    expect(onClick).toHaveBeenCalledWith("key");
    expect(onSort).not.toHaveBeenCalled();
  });
  it("should call onSort when sortable = true and clicked", () => {
    //Arrange
    const onSort = jest.fn();
    render(
      <ColumnHeader
        column={{
          key: "key",
          title: "title",
          sortable: true,
          onSort,
        }}
      />
    );
    //Act
    screen.getByText("title").click();
    //Assert
    expect(onSort).toHaveBeenCalledWith("key");
  });
  it("should render filter when allowFiltering is true", () => {
    //Arrange
    //Act
    render(
      <ColumnHeader
        column={{
          key: "key",
          title: "title",
          allowFiltering: true,
        }}
      />
    );
    //Assert
    screen.getByTestId("input-filter");
  });
  it("should not render filter when allowFiltering is false", () => {
    //Arrange
    //Act
    render(
      <ColumnHeader
        column={{
          key: "key",
          title: "title",
          allowFiltering: false,
        }}
      />
    );
    //Assert
    expect(screen.queryByTestId("input-filter")).toBeNull();
  });
  it("should call on filter when filter value changes", () => {
    //Arrange
    const onFilter = jest.fn();
    render(
      <ColumnHeader
        column={{
          key: "key",
          title: "title",
          allowFiltering: true,
        }}
        onFilter={onFilter}
      />
    );
    //Act

    fireEvent.change(screen.getByTestId("input-filter"), {
      target: {
        value: "filter",
      },
    });
    //Assert
    expect(onFilter).toHaveBeenCalledWith("filter");
  });
  it("should render arrow up when clicked once", () => {
    //Arrange
    render(
      <ColumnHeader
        column={{
          key: "key",
          title: "title",
          sortable: true,
        }}
      />
    );
    //Act
    screen.getByTestId("header").click();
    //Assert
    waitFor(() => screen.getByTestId("arrow-up"));
  });
  it("should render arrow down when clicked twice", () => {
    //Arrange
    render(
      <ColumnHeader
        column={{
          key: "key",
          title: "title",
          sortable: true,
        }}
      />
    );
    //Act
    screen.getByTestId("header").click();
    screen.getByTestId("header").click();
    //Assert
    waitFor(() => screen.getByTestId("arrow-down"));
  });
  it("should render customSortIndicator and pass sortState if it has value", () => {
    //Arrange
    const customSortIndicator = jest.fn(() => <div>customSortIndicator</div>);
    //Act
    render(
      <ColumnHeader
        column={{
          key: "key",
          title: "title",
          sortable: true,
          customSortIndicator,
        }}
      />
    );
    screen.getByTestId("header").click();
    //Assert
    screen.getByText("customSortIndicator");
    waitFor(() =>
      expect(customSortIndicator).toHaveBeenCalledWith({ sortState: "asc" })
    );
  });
  it("should render customFilterRenderer if it has value", () => {
    //Arrange
    const customFilterRenderer = jest.fn(() => <div>customFilterRenderer</div>);
    const onFilter = jest.fn();
    //Act
    render(
      <ColumnHeader
        column={{
          key: "key",
          title: "title",
          allowFiltering: true,
          customFilterRenderer,
        }}
        onFilter={onFilter}
      />
    );
    screen.getByTestId("header").click();
    //Assert
    screen.getByText("customFilterRenderer");
    expect(customFilterRenderer).toHaveBeenCalledWith(
      expect.objectContaining({ onChange: onFilter })
    );
  });
});
