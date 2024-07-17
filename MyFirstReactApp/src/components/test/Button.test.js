import React from "react";
import { fireEvent, getAllByTestId, render } from "@testing-library/react";
import Button from "../Button";
describe("Check if Button works properly", () => {
  test("Check if button rendered correctly", () => {
    render(<Button />);
    // const { debug } = render(<Button text="plop"/>);
    // debug();
    const { getAllByTestId } = render(<Button text="plop" />);
    const element = getAllByTestId("button-test-id");
    // console.log(debug);
    expect(element).toBeTruthy();
  });
  test("Check if text displayed properly", () => {
    const text = "Cancel";
    const { getByText } = render(<Button value={text}></Button>);
    getByText(text);
  });
  test("Check if onClick is triggered", () => {
    const onClick = jest.fn();

    const { getByTestId } = render(<Button handleSub={onClick} />);
    const element = getByTestId("button-test-id");
    fireEvent.click(element);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
  test("Check if snapshot is matched properly", () => {
    const onClick = jest.fn();
    const text = "Click";
    const { asFragment } = render(<Button onClick={onClick}></Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
