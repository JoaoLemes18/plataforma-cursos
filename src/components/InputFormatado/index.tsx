import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hook/useDebounce";

interface InputFormatadoProps {
  name: string;
  placeholder: string;
  value: string;
  erro?: boolean;
  tipo?: "cpf" | "telefone" | "email" | "text";
  onChange: (name: string, value: string) => void;
}

const formatarCPF = (cpf: string): string => {
  cpf = cpf.replace(/\D/g, "").slice(0, 11);
  if (cpf.length <= 3) return cpf;
  if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
  if (cpf.length <= 9)
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(
    9
  )}`;
};

const formatarTelefone = (telefone: string): string => {
  telefone = telefone.replace(/\D/g, "").slice(0, 11);
  if (telefone.length <= 2) return `(${telefone}`;
  if (telefone.length <= 6)
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
  if (telefone.length <= 10)
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(
      6
    )}`;
  return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(
    7
  )}`;
};

const InputFormatado: React.FC<InputFormatadoProps> = ({
  name,
  placeholder,
  value,
  erro,
  tipo = "text",
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(name, debouncedValue);
    }
  }, [debouncedValue, name, onChange, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (tipo === "cpf") val = formatarCPF(val);
    else if (tipo === "telefone") val = formatarTelefone(val);

    setInputValue(val);
  };

  // Se o value externo mudar, sincroniza internamente (ex: limpar formulário)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <input
      name={name}
      className={`input ${erro ? "erro" : ""}`}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      type={tipo === "email" ? "email" : "text"}
    />
  );
};

export default InputFormatado;
