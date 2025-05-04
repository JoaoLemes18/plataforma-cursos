import React, { useState } from "react";
import { loginPessoa } from "../../services/AutenticacaoService"; // Importando o serviço de login
import Register from "../Cadastro";
import { toast } from "react-toastify"; // Importando o toast
import "react-toastify/dist/ReactToastify.css"; // Estilos do toast
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
      // Chama o serviço de login
      const token = await loginPessoa(payload);

      if (token) {
        // Supondo que a API retorne um token após login bem-sucedido
        console.log("Login bem-sucedido! Token:", token);
        // Armazenar o token, redirecionar ou realizar alguma outra ação
        localStorage.setItem("token", token); // Exemplo de armazenamento no localStorage
        // Redirecionando para a página "home"
        window.location.href = "/home"; // Redireciona para a página Home
        toast.success("Login realizado com sucesso!"); // Toast de sucesso
      } else {
        toast.error("Credenciais inválidas. Tente novamente."); // Toast de erro
      }
    } catch (err) {
      console.error("Erro no login:", err);
      if (err.response?.status === 401) {
        toast.error("Credenciais inválidas. Verifique seu e-mail e senha.");
      } else {
        toast.error("Erro ao realizar login. Tente novamente.");
      }
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
