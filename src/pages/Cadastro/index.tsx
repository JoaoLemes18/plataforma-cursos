import React, { useState } from "react";
import { cadastrarPessoa } from "../../services/AutenticacaoService";
import { useNavigate } from "react-router-dom";
import { validarCadastroPessoa } from "../../utils/validacoes";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

import InputFormatado from "../../components/InputFormatado";
import PasswordInput from "../../components/PasswordInput";

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

  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState<{ [key in keyof FormData]?: boolean }>({});
  const navigate = useNavigate();

  const handleChange = (name: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tipo" ? Number(value) : value,
    }));
    setErros((prev) => ({ ...prev, [name]: false }));
  };

  const validarCampos = () => {
    const { valido, erros } = validarCadastroPessoa(formData);
    setErros(erros);
    return valido;
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
          navigate("/login");
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
      <div className="card">
        <h2 className="title">Criar usuário</h2>
        <p className="subtitle">Preencha os dados necessários para começar</p>

        <input
          name="nome"
          className={`input ${erros.nome ? "erro" : ""}`}
          placeholder="Seu nome completo"
          value={formData.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
        />

        <InputFormatado
          name="cpf"
          placeholder="000.000.000-00"
          value={formData.cpf}
          erro={erros.cpf}
          tipo="cpf"
          onChange={handleChange}
        />

        <InputFormatado
          name="email"
          placeholder="seu@email.com"
          value={formData.email}
          erro={erros.email}
          tipo="email"
          onChange={handleChange}
        />

        <InputFormatado
          name="telefone"
          placeholder="(00) 00000-0000"
          value={formData.telefone}
          erro={erros.telefone}
          tipo="telefone"
          onChange={handleChange}
        />

        <select
          name="tipo"
          className="input"
          value={formData.tipo}
          onChange={(e) => handleChange("tipo", Number(e.target.value))}
        >
          {Object.entries(tipoMap).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <PasswordInput
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          erro={erros.senha}
          onChange={handleChange}
        />

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
