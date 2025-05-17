import React, { useState } from "react";
import { cadastrarPessoa } from "../../services/AutenticacaoService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

const tipoMap: { [key: number]: string } = {
  1: "Aluno",
  2: "Professor",
  3: "Coordenador",
  4: "Administrativo",
  5: "Financeiro",
  6: "Master",
};

interface FormData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  tipo: number;
  senha: string;
}

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    tipo: 1,
    senha: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState<{ [key in keyof FormData]?: boolean }>({});

  const formatarCPF = (cpf: string): string => {
    cpf = cpf.replace(/\D/g, "").slice(0, 11);
    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length <= 9)
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
      6,
      9
    )}-${cpf.slice(9)}`;
  };

  const formatarTelefone = (telefone: string): string => {
    telefone = telefone.replace(/\D/g, "").slice(0, 11);
    if (telefone.length <= 2) return `(${telefone}`;
    if (telefone.length <= 6)
      return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
    if (telefone.length <= 10)
      return `(${telefone.slice(0, 2)}) ${telefone.slice(
        2,
        6
      )}-${telefone.slice(6)}`;
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(
      7
    )}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cpf") {
      formattedValue = formatarCPF(value);
    } else if (name === "telefone") {
      formattedValue = formatarTelefone(value);
    }

    setFormData({
      ...formData,
      [name]: name === "tipo" ? parseInt(value) : formattedValue,
    });

    setErros((prev) => ({ ...prev, [name]: false }));
  };

  const validarCampos = () => {
    const novosErros: { [key in keyof FormData]?: boolean } = {};
    if (!formData.nome.trim()) novosErros.nome = true;
    if (!formData.cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/))
      novosErros.cpf = true;
    if (
      !formData.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
    )
      novosErros.email = true;
    if (!formData.telefone.match(/^\(\d{2}\) \d{4,5}-\d{4}$/))
      novosErros.telefone = true;
    if (!formData.senha.trim()) novosErros.senha = true;

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleRegister = async () => {
    if (!validarCampos()) {
      toast.error("Preencha todos os campos corretamente.");
      return;
    }

    setLoading(true);

    try {
      const novaPessoa = {
        nome: formData.nome,
        cpf: formData.cpf,
        email: formData.email,
        telefone: formData.telefone,
        tipoUsuario: formData.tipo,
        senha: formData.senha,
      };

      const response = await cadastrarPessoa(novaPessoa);
      if (response) {
        toast.success(
          "Cadastro realizado com sucesso! Faça login para continuar."
        );
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        toast.error("Erro ao cadastrar. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);
      toast.error("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authContainer">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card">
        <h2 className="title">Criar usuário</h2>
        <p className="subtitle">Preencha os dados necessários para começar</p>

        <input
          name="nome"
          className={`input ${erros.nome ? "erro" : ""}`}
          placeholder="Seu nome completo"
          value={formData.nome}
          onChange={handleChange}
        />
        <input
          name="cpf"
          className={`input ${erros.cpf ? "erro" : ""}`}
          placeholder="000.000.000-00"
          value={formData.cpf}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          className={`input ${erros.email ? "erro" : ""}`}
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="telefone"
          className={`input ${erros.telefone ? "erro" : ""}`}
          placeholder="(00) 00000-0000"
          value={formData.telefone}
          onChange={handleChange}
        />

        <select
          name="tipo"
          className="input"
          value={formData.tipo}
          onChange={handleChange}
        >
          {Object.entries(tipoMap).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <div className="passwordWrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="senha"
            className={`input ${erros.senha ? "erro" : ""}`}
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
          />
          <span
            className="togglePassword"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁️
          </span>
        </div>

        <button className="button" onClick={handleRegister} disabled={loading}>
          {loading ? "Cadastrando..." : "Criar conta"}
        </button>

        <div className="divider">
          <span className="linkText">Já tem uma conta?</span>
        </div>

        <button
          className="secondaryButton"
          onClick={() => (window.location.href = "/login")}
        >
          Fazer login
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
