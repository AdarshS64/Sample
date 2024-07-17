import React from "react";
import { fireEvent, getAllByTestId, render } from "@testing-library/react";
import TextField from "../TextField";
describe("Check if TextField works properly", () => {
  test("Check if TextField rendered correctly", () => {
    render(<TextField />);
    // const { debug } = render(<Button text="plop"/>);
    // debug();
    const { getAllByTestId } = render(<TextField />);
    const element = getAllByTestId("TextField-test-id");
    // console.log(debug);
    expect(element).toBeTruthy();
  });

  test("Check if label displayed properly", () => {
    const text = "Yo";
    const { getByText } = render(<TextField label={text}></TextField>);
    getByText(text);
  });

  test("Check if placeholder displayed properly", () => {
    const text = "Yo";
    const { getByPlaceholderText } = render(
      <TextField placeholder={text}></TextField>
    );
    const element = getByPlaceholderText(text);
    expect(element).toBeTruthy();
  });

  test("Check if onClick is triggered", () => {
    let value = "car";
    const onClick = jest.fn((e) => {
      value = e.target.value;
    });

    const { getByTestId } = render(<TextField onChange={onClick} />);
    const element = getByTestId("TextField-test-id");
    fireEvent.change(element, { target: { value: value } });

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(value).toBe("car");
  });

  test("Check if onClick is triggered for Date field", () => {
    let value = "2024-07-12";
    const type = "date";
    const onClick = jest.fn((e) => {
      value = e.target.value;
    });

    const { getByTestId } = render(
      <TextField onChange={onClick} type={type} />
    );
    const element = getByTestId("TextField-test-id");
    fireEvent.change(element, { target: { value: value } });

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(value).toBe("2024-07-12");
  });

  test("Check if snapshot is matched properly", () => {
    let value = "car";
    const onClick = jest.fn((e) => {
      value = e.target.value;
    });
    const text = "Click";
    const placeholder = "car";
    const type = "text";
    const { asFragment, getByTestId } = render(
      <TextField
        label={text}
        type={type}
        onChange={onClick}
        placeholder={placeholder}
        data-testid="TextField-test-id"
      ></TextField>
    );
    const inputElement = getByTestId("TextField-test-id");

    // Simulate change event on the input element
    fireEvent.change(inputElement, { target: { value: value } });
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(value).toBe("car");
    expect(asFragment()).toMatchSnapshot();
  });
});
