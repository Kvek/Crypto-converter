import { ChangeEventHandler, InputHTMLAttributes } from "react";

import "./Input.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
}

export const Input = (props: Props) => {
  return (
    <div className="Input-container">
      <input {...props} />
    </div>
  );
};
