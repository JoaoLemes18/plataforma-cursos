import React, { useState } from "react";

interface PasswordInputProps {
  name: string;
  placeholder: string;
  value: string;
  erro?: boolean;
  onChange: (name: string, value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  placeholder,
  value,
  erro,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="passwordWrapper">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        className={`input ${erro ? "erro" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
      <span
        className="togglePassword"
        onClick={() => setShowPassword(!showPassword)}
        style={{ cursor: "pointer" }}
        aria-label="Mostrar/Ocultar senha"
      >
        👁️
      </span>
    </div>
  );
};

export default PasswordInput;
