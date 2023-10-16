import { ChangeEventHandler, useEffect, useState } from "react";
import "./App.css";

import { Dropdown } from "./Dropdown";
import { Input } from "./Input";
import { Ticker } from "./Ticker";

const items = [
  { key: "USD", value: "USD" },
  { key: "GBP", value: "GBP" },
  { key: "EUR", value: "EUR" },
  { key: "CNY", value: "CNY" },
  { key: "JPY", value: "JPY" },
];
function App() {
  const [currency, setCurrency] = useState("");
  const [quantity, setQuantity] = useState("");
  const [value, setValue] = useState<string | number>("");

  const onChangeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCurrency(e.target.value);
  };

  const onInputChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    setInterval(() => {
      setValue(() => {
        const min = 1;
        const max = 2;
        return Math.round((Math.random() * (max - min) + min) * 100) / 100;
      });
    }, 10000);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto converter</h1>
      </header>

      <section>
        <h5>{currency}</h5>
        <h5>{quantity}</h5>
      </section>

      <div className="App-content">
        <div className="Input-fields">
          <Input
            value={quantity}
            id="quantity"
            onChange={onInputChangeHandler}
            type="number"
          />
          <Dropdown items={items} onChange={onChangeHandler} />
        </div>

        <section>
          <Ticker value={value} />
        </section>
      </div>
    </div>
  );
}

export default App;
