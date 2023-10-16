import { ChangeEventHandler, useEffect, useState } from "react";
import "./App.css";

import { Dropdown } from "./Dropdown";
import { Input } from "./Input";
import { Ticker } from "./Ticker";
import { AjaxError, ajax } from "rxjs/ajax";
import {
  catchError,
  debounceTime,
  map,
  of,
  switchMap,
  takeWhile,
  timer,
} from "rxjs";

const items = [
  { key: "USD", value: "USD" },
  { key: "GBP", value: "GBP" },
  { key: "EUR", value: "EUR" },
  { key: "CNY", value: "CNY" },
  { key: "JPY", value: "JPY" },
];
const currencySymbol = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  CNY: "¥",
  JPY: "円",
};
type CurrencySymbolType = keyof typeof currencySymbol;

function App() {
  const [currency, setCurrency] = useState<CurrencySymbolType>("USD");
  const [quantity, setQuantity] = useState("");
  const [value, setValue] = useState<string | number>("");

  const onChangeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCurrency(e.target.value as CurrencySymbolType);
  };

  const onInputChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuantity(e.target.value.split(",").join(""));
  };

  const getExchange = (currency: string) => {
    /**
     * Wait 10s between each call.
     *
     * Using switchMap again here in-case timer emits a new value before response is complete
     */
    return timer(0, 10000).pipe(
      switchMap(() =>
        ajax<{ value: number }>(
          `https://api.frontendeval.com/fake/crypto/${currency}`
        ).pipe(map(({ response }) => response.value))
      )
    );
  };

  useEffect(() => {
    /**
     * Making an observable from the currency using 'of'
     */
    const subscription = of(currency)
      .pipe(
        debounceTime(500),
        takeWhile((curr) => !!curr),
        switchMap((curr) => getExchange(curr))
      )
      .pipe(catchError((error: AjaxError) => of(error.response as null)))
      .subscribe((res) => {
        if (res) {
          const currencyQuantity = quantity ? +quantity : 1;
          setValue((currencyQuantity * Number(res)).toFixed(3));
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [currency, quantity]);

  const formattedQuantityString = quantity
    ? Number(quantity).toLocaleString("en-GB")
    : quantity;
  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto converter</h1>
      </header>

      <main className="App-content">
        <div className="Input-fields">
          <span>
            <label htmlFor="quantity">Enter Quantity</label>
            <div className="Input-field-container">
              <span className="Currency-prefix" data-testid="currency-prefix">
                {currency && currencySymbol?.[currency]}
              </span>

              <Input
                data-testid="quantity-input"
                value={formattedQuantityString}
                id="quantity"
                onChange={onInputChangeHandler}
                placeholder="Quantity"
                className="Quantity-input-field"
              />
            </div>
          </span>

          <span>
            <label htmlFor="currency">Select Currency</label>
            <Dropdown
              data-testid="currency-dropdown"
              defaultValue={currency}
              id="currency"
              items={items}
              onChange={onChangeHandler}
              placeholder={"Currency"}
            />
          </span>
        </div>

        <section>
          <Ticker value={value} />
        </section>
      </main>
    </div>
  );
}

export default App;
