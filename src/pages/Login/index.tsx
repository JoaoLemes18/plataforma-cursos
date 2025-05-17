import React, { useState } from "react";
import { loginPessoa } from "../../services/AutenticacaoService";
import { useUser } from "../../Contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailErro, setEmailErro] = useState(false);
  const [senhaErro, setSenhaErro] = useState(false);
  const { setUsuario } = useUser();

  const handleLogin = async () => {
    // Resetando erros
    setEmailErro(false);
    setSenhaErro(false);

    let temErro = false;

    if (!email.trim()) {
      setEmailErro(true);
      toast.error("Preencha o e-mail.");
      temErro = true;
    }

    if (!password.trim()) {
      setSenhaErro(true);
      toast.error("Preencha a senha.");
      temErro = true;
    }

    if (temErro) return;

    const payload = { email, senha: password };
    setLoading(true);

    try {
      const response = await loginPessoa(payload);

      if (response && response.tipoUsuario !== undefined) {
        setUsuario(response);
        toast.success("Login realizado com sucesso!");

        let rota = "/home";
        switch (response.tipoUsuario) {
          case 1:
            rota = "/painel-aluno";
            break;
          case 2:
            rota = "/painel-professor";
            break;
          case 3:
            rota = "/painel-coordenador";
            break;
          case 4:
            rota = "/painel-administrativo";
            break;
          case 5:
            rota = "/painel-financeiro";
            break;
          case 6:
            rota = "/home";
            break;
          default:
            rota = "/home";
        }

        setTimeout(() => {
          window.location.href = rota;
        }, 1500);
      } else {
        console.error("Resposta inválida:", response);
        toast.error("Email ou senha inválidos.");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      toast.error("Erro ao realizar login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authContainer">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card">
        <h2 className="title">Bem-vindo de volta!</h2>
        <p className="subtitle">Acesse sua conta</p>
        <input
          type="email"
          className={`input ${emailErro ? "erro" : ""}`}
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailErro(false);
          }}
        />
        <div className="passwordWrapper">
          <input
            type={showPassword ? "text" : "password"}
            className={`input ${senhaErro ? "erro" : ""}`}
            placeholder="Senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setSenhaErro(false);
            }}
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
          onClick={() => (window.location.href = "/")}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default Login;
