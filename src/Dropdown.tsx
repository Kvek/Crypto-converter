import { ChangeEventHandler } from "react";

import "./Dropdown.css";

type Props = {
  items: Array<Record<"key" | "value", string>>;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};
export const Dropdown = ({ items, onChange }: Props) => {
  return (
    <div className="Dropdown-container ">
      <select onChange={onChange}>
        <option>Currency</option>
        {items.map(({ key, value }) => (
          <option value={value} key={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
