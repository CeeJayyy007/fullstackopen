import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import App, { Button, Display, StatisticLine, Statistics } from "./App";
import store from "./store/store";

describe("Button", () => {
  let user;
  let handleClick;

  beforeEach(() => {
    user = userEvent.setup();
    handleClick = jest.fn();
  });

  test("renders with correct text", () => {
    render(<Button text="Test Button" />);
    const button = screen.getByText("Test Button");
    expect(button.textContent).toBe("Test Button");
  });

  test("handles click", async () => {
    render(<Button handleClick={handleClick} text="Test Button" />);
    const button = screen.getByText("Test Button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe("Display", () => {
  test("renders with correct value", () => {
    render(<Display value="Test Value" />);
    const display = screen.getByText("Test Value");

    expect(display.textContent).toBe("Test Value");
  });
});

describe("StatisticLine", () => {
  test("renders with correct text and value", () => {
    render(<StatisticLine text="Test Text" value="Test Value" />);

    const text = screen.getByText("Test Text");
    const value = screen.getByText("Test Value");
    expect(text.textContent).toBe("Test Text");
    expect(value.textContent).toBe("Test Value");
  });
});

describe("Statistics", () => {
  test("renders with correct values", () => {
    const { getByText } = render(<Statistics good={5} neutral={3} bad={2} />);

    expect(getByText("Good")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
    expect(getByText("Neutral")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("Bad")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
  });

  test('renders "No feedback given" when all values are 0', () => {
    const { getByText } = render(<Statistics good={0} neutral={0} bad={0} />);
    expect(getByText("No feedback given")).toBeInTheDocument();
  });
});

describe("App", () => {
  test("renders with initial state", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText("Give Feedback")).toBeInTheDocument();
    expect(getByText("Statistics")).toBeInTheDocument();
    expect(getByText("No feedback given")).toBeInTheDocument();
  });
});
