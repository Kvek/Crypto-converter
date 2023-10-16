import { useEffect, useState } from "react";
import { Down } from "./Icons/Down";
import { Up } from "./Icons/Up";

import "./Ticker.css";

type Props = {
  value: number | string;
};

export const Ticker = ({ value }: Props) => {
  const [previousValue, setPreviousValue] = useState<string | number>("");
  const [currentValue, setCurrentValue] = useState<string | number>("");

  useEffect(() => {
    setPreviousValue(currentValue);
    setCurrentValue(value);
  }, [value]);

  const difference =
    Math.round(
      Math.sqrt(Math.pow(Number(previousValue) - Number(currentValue), 2)) * 100
    ) / 100;

  return (
    <div className="Container">
      {currentValue} WUC
      <div
        className={`Difference ${
          previousValue > currentValue ? "decreased" : "increased"
        }`}
      >
        <span>{previousValue > currentValue ? <Down /> : <Up />}</span>
        <span>{difference}</span>
      </div>
    </div>
  );
};
