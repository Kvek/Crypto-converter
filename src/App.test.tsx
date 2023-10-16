import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("check if currency symbol is shown on inital load", () => {
  render(<App />);

  const currencySymbol = screen.getByTestId("currency-prefix").textContent;
  /**
   * First icon shown is USD;
   */
  expect(currencySymbol).toBe("$");
});

test("check if currency symbol is changed on change of currency", () => {
  render(<App />);

  /**
   * Change to GBP
   */

  fireEvent.change(screen.getByTestId("currency-dropdown"), {
    target: { value: "GBP" },
  });

  expect(screen.getByTestId("currency-prefix").textContent).toBe("£");

  /**
   * Change to JPY
   */

  fireEvent.change(screen.getByTestId("currency-dropdown"), {
    target: { value: "JPY" },
  });

  expect(screen.getByTestId("currency-prefix").textContent).toBe("円");
});

test("check input formatting", () => {
  render(<App />);

  const input = screen.getByTestId<HTMLInputElement>("quantity-input");

  fireEvent.change(input, { target: { value: "123456789" } });

  expect(input.value).toBe("123,456,789");
});
