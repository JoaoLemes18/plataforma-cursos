import React, { useState } from "react";
import { loginPessoa } from "../../services/AutenticacaoService";
import { validarLoginPessoa } from "../../utils/validacoes";

import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import "./styles.scss";

import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";

const Login: React.FC = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    loading: false,
    emailErro: false,
    senhaErro: false,
  });

  const { email, password, loading, emailErro, senhaErro } = formState;

  const setField = (field: keyof typeof formState, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const { setUsuario } = useUser();

  const handleLogin = async () => {
    setField("emailErro", false);
    setField("senhaErro", false);

    const { valido, erros } = validarLoginPessoa({ email, senha: password });

    if (!valido) {
      if (erros.email) {
        setField("emailErro", true);
        toast.error("E-mail inválido.");
      }
      if (erros.senha) {
        setField("senhaErro", true);
        toast.error("Senha não pode ser vazia.");
      }
      return;
    }

    setField("loading", true);

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
      setField("loading", false);
    }
  };

  return (
    <div className="authContainer">
      <div className="card">
        <h2 className="title">Bem-vindo de volta!</h2>
        <p className="subtitle">Acesse sua conta</p>

        <Input
          type="email"
          placeholder="seu@email.com"
          value={email}
          erro={emailErro}
          onChange={(e) => setField("email", e.target.value)}
        />

        <PasswordInput
          name="password"
          placeholder="Senha"
          value={password}
          erro={senhaErro}
          onChange={(name, value) =>
            setField(name as keyof typeof formState, value)
          }
        />

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
