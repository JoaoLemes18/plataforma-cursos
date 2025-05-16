import React, { useState } from "react";
import { loginPessoa } from "../../services/AutenticacaoService"; // Importando o serviço de login
import Register from "../Cadastro";
import "./styles.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false); // Para exibir carregamento durante a requisição

  const handleLogin = async () => {
    const payload = { email, senha: password };

    setLoading(true);

    try {
      const response = await loginPessoa(payload);

      // Verifique a resposta e se o tipoUsuario existe na resposta
      console.log("Resposta da API:", response); // Verifique a resposta
      if (response && response.tipoUsuario !== undefined) {
        console.log(
          "Login bem-sucedido! Tipo de usuário:",
          response.tipoUsuario
        );

        // Redireciona para a página "home" ou outra página dependendo do tipo de usuário
        // Aqui você pode adicionar redirecionamento condicional com base no tipo de usuário
        if (response.tipoUsuario === 2) {
          window.location.href = "/home"; // Redireciona para a página "home" para o tipo de usuário 2
        } else {
          console.log("Tipo de usuário não suportado.");
        }
      } else {
        console.error("Resposta inválida:", response); // Se 'tipoUsuario' não estiver presente
      }
    } catch (err) {
      console.error("Erro no login:", err);
      alert("Erro ao realizar login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (showRegister) return <Register />;

  return (
    <div className="authContainer">
      <div className="card">
        <h2 className="title">Bem-vindo de volta!</h2>
        <p className="subtitle">Acesse sua conta</p>
        <input
          type="email"
          className="input"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="passwordWrapper">
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="togglePassword"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁️
          </span>
        </div>
        <button className="button" onClick={handleLogin} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <div className="divider">
          <span className="linkText">Novo por aqui?</span>
        </div>
        <button
          className="secondaryButton"
          onClick={() => setShowRegister(true)}
        >
          Criar uma conta
        </button>
      </div>
    </div>
  );
};

export default Login;
