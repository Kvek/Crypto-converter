import { ChangeEventHandler } from "react";

import "./Dropdown.css";

type Props = {
  items: Array<Record<"key" | "value", string>>;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  placeholder?: string;
  id: string;
  defaultValue?: string;
  "data-testid"?: string;
};
export const Dropdown = ({
  items,
  onChange,
  placeholder,
  id,
  defaultValue,
  ...props
}: Props) => {
  return (
    <div className="Dropdown-container">
      <select
        onChange={onChange}
        id={id}
        defaultValue={defaultValue}
        {...props}
      >
        {placeholder && (
          <option hidden value="">
            {placeholder}
          </option>
        )}

        {items.map(({ key, value }) => (
          <option value={value} key={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
