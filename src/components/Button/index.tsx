import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  loading,
  disabled,
  children,
  ...rest
}) => {
  return (
    <button
      className={variant === "primary" ? "button" : "secondaryButton"}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
};

export default Button;
