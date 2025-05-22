import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  erro?: boolean;
}

const Input: React.FC<InputProps> = ({ erro, className, ...rest }) => {
  return (
    <input
      className={`input ${erro ? "erro" : ""} ${className ?? ""}`}
      {...rest}
    />
  );
};

export default Input;
