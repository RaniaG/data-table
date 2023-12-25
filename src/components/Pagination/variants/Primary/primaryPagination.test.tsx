import React from "react";
import { PrimaryPagination } from "./primaryPagination";
import { fireEvent, render, screen } from "@testing-library/react";

describe("primary pagination props", () => {
  it("should render page size options and have first option selected when pageSize is undefined", () => {
    //Arrange
    //Act
    render(
      <PrimaryPagination
        totalNumberOfItems={10}
        currentPage={1}
        pageSize={undefined}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    );
    //Assert
    [5, 10, 15, 25, 50, 100].forEach((e, i) => {
      expect(screen.getAllByTestId(`page-size-option`)[i].textContent).toEqual(
        e.toString()
      );
    });
    expect(
      (screen.getAllByTestId(`page-size-option`)[0] as HTMLOptionElement)
        .selected
    ).toBeTruthy();
  });
  it("should select the pageSize if it has value and sort the pageSizes", () => {
    //Arrange
    //Act
    render(
      <PrimaryPagination
        totalNumberOfItems={100}
        currentPage={1}
        pageSize={30}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    );
    //Assert
    expect(screen.getAllByTestId(`page-size-option`)[3].textContent).toEqual(
      "25"
    );
    expect(screen.getAllByTestId(`page-size-option`)[4].textContent).toEqual(
      "30"
    );
    expect(screen.getAllByTestId(`page-size-option`)[5].textContent).toEqual(
      "50"
    );
  });
  it("should call onPageSizeChanged when page size dropdown changes", () => {
    //Arrange
    const onPageSizeChanged = jest.fn();
    render(
      <PrimaryPagination
        totalNumberOfItems={100}
        currentPage={1}
        pageSize={30}
        onPageChange={() => {}}
        onPageSizeChange={onPageSizeChanged}
      />
    );
    //Act
    fireEvent.change(screen.getByTestId("page-size-select"), {
      target: { value: 5 },
    });
    //Assert
    expect(onPageSizeChanged).toHaveBeenCalledWith(5);
  });
  it("should call onPageChange when page dropdown changes", () => {
    //Arrange
    const onPageChange = jest.fn();
    render(
      <PrimaryPagination
        totalNumberOfItems={100}
        currentPage={1}
        pageSize={30}
        onPageChange={onPageChange}
        onPageSizeChange={() => {}}
      />
    );
    //Act
    screen.getByTestId("right-chevron").click();
    //Assert
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
  it.each([
    [100, 30, 3, "61 - 90 of 100"],
    [50, 10, 1, "1 - 10 of 50"],
    [10, 5, 2, "6 - 10 of 10"],
  ])(
    "should render correct number of items",
    (
      totalNumberOfItems: number,
      pageSize: number,
      pageNumber: number,
      expectedString: string
    ) => {
      //Arrange
      //Act
      render(
        <PrimaryPagination
          totalNumberOfItems={totalNumberOfItems}
          currentPage={pageNumber}
          pageSize={pageSize}
          onPageChange={() => {}}
          onPageSizeChange={() => {}}
        />
      );
      //Assert
      screen.getByText(expectedString);
    }
  );
  it("should disable left arrows if current page = 1", () => {
    //Arrange
    //Act

    render(
      <PrimaryPagination
        totalNumberOfItems={100}
        currentPage={1}
        pageSize={30}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    );
    //Assert
    expect(screen.getByTestId("left-double-chevron")).toBeDisabled();
    expect(screen.getByTestId("left-chevron")).toBeDisabled();
    expect(screen.getByTestId("right-chevron")).toBeEnabled();
    expect(screen.getByTestId("right-double-chevron")).toBeEnabled();
  });
  it("should disable right arrows if current page is last page", () => {
    //Arrange
    //Act
    render(
      <PrimaryPagination
        totalNumberOfItems={100}
        currentPage={4}
        pageSize={30}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    );
    //Assert
    expect(screen.getByTestId("left-double-chevron")).toBeEnabled();
    expect(screen.getByTestId("left-chevron")).toBeEnabled();
    expect(screen.getByTestId("right-chevron")).toBeDisabled();
    expect(screen.getByTestId("right-double-chevron")).toBeDisabled();
  });
});
