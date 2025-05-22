import React, { useState } from "react";
import { loginPessoa } from "../../services/AutenticacaoService";
import { useUser } from "../../Contexts/UserContext";
import { toast } from "react-toastify";
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
    setEmailErro(false);
    setSenhaErro(false);

    if (!email.trim()) {
      setEmailErro(true);
      toast.error("Preencha o e-mail.");
      return;
    }

    if (!password.trim()) {
      setSenhaErro(true);
      toast.error("Preencha a senha.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginPessoa({ email, senha: password });

      if (response && response.tipoUsuario !== undefined) {
        setUsuario(response);
        toast.success("Login realizado com sucesso!");

        const rotas: { [key: number]: string } = {
          1: "/painel-aluno",
          2: "/painel-professor",
          3: "/painel-coordenador",
          4: "/painel-administrativo",
          5: "/painel-financeiro",
          6: "/home",
        };

        const rota = rotas[response.tipoUsuario] || "/home";

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
