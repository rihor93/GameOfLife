import React, { ChangeEvent, FC } from "react";

export type InputProps = {
    className?: string;
    value: string;
    onChange: (event: { value: string}) => void;
  };

export const Input: FC<InputProps> = ({ className, value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ value: e.target.value });
  return (
    <input
      className={className}
      value={value}
      onChange={handleChange}
    />
  );
};
