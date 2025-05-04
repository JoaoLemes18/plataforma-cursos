import React, { useState } from "react";
import { cadastrarPessoa } from "../../services/AutenticacaoService";
import Login from "../Login";
import "./styles.scss";

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    tipo: 1, // Aluno = 1
    senha: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Mapeamento do tipo de usuário como número
    const tipoMap: { [key: number]: string } = {
      1: "Aluno",
      2: "Professor",
      3: "Coordenador",
      4: "Administrativo",
      5: "Financeiro",
      6: "Master",
    };

    // Atualiza os dados do formulário com o tipo como número
    setFormData({
      ...formData,
      [name]: name === "tipo" ? parseInt(value) : value, // Armazena o tipo como número
    });
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const novaPessoa = {
        nome: formData.nome,
        cpf: formData.cpf,
        email: formData.email,
        telefone: formData.telefone,
        tipoUsuario: formData.tipo, // Envia tipo como número
        senha: formData.senha,
      };

      const response = await cadastrarPessoa(novaPessoa as any);
      if (response) {
        setShowLogin(true);
      } else {
        setError("Erro ao cadastrar. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setError("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (showLogin) return <Login />;

  return (
    <div className="authContainer">
      <div className="card">
        <h2 className="title">Criar usuário</h2>
        <p className="subtitle">Preencha os dados necessários para começar</p>

        <input
          name="nome"
          className="input"
          placeholder="Seu nome completo"
          onChange={handleChange}
        />
        <input
          name="cpf"
          className="input"
          placeholder="000.000.000-00"
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          className="input"
          placeholder="seu@email.com"
          onChange={handleChange}
        />
        <input
          name="telefone"
          className="input"
          placeholder="(00) 00000-0000"
          onChange={handleChange}
        />

        <select name="tipo" className="input" onChange={handleChange}>
          <option value={1}>Aluno</option>
          <option value={2}>Professor</option>
          <option value={3}>Coordenador</option>
          <option value={4}>Administrativo</option>
          <option value={5}>Financeiro</option>
          <option value={6}>Master</option>
        </select>

        <div className="passwordWrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="senha"
            className="input"
            placeholder="Senha"
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

        {error && <p className="errorText">{error}</p>}

        <div className="divider">
          <span className="linkText">Já tem uma conta?</span>
        </div>

        <button className="secondaryButton" onClick={() => setShowLogin(true)}>
          Fazer login
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
