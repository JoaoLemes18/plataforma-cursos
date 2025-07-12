import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginPessoa } from "../../services/AutenticacaoService";
import { validarLoginPessoa } from "../../utils/validacoes";

import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import "./styles.scss";

import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";

import { FormDataLogin } from "../../types";

const Login: React.FC = () => {
  const [formState, setFormState] = useState<FormDataLogin>({
    email: "",
    password: "",
    loading: false,
    emailErro: false,
    senhaErro: false,
  });

  const { email, password, loading, emailErro, senhaErro } = formState;
  const setField = (field: keyof FormDataLogin, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const { setUsuario } = useUser();
  const navigate = useNavigate();

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
        setUsuario(response); // Salva no contexto + sessionStorage
        toast.success("Login realizado com sucesso!");

        // Mapeamento de tipoUsuario para rota
        const rotas: { [key: number]: string } = {
          1: "/painel-aluno",
          2: "/painel-professor",
          3: "/painel-coordenador",
          4: "/painel-administrativo",
          5: "/painel-financeiro",
        };

        const rota = rotas[response.tipoUsuario] || "/home";

        navigate(rota); // Redireciona sem recarregar
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
            setField(name as keyof FormDataLogin, value)
          }
        />

        <button className="button" onClick={handleLogin} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="divider">
          <span className="linkText">Novo por aqui?</span>
        </div>

        <button className="secondaryButton" onClick={() => navigate("/")}>
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default Login;
