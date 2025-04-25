import { api } from "..";

// Tipagem da Pessoa
export interface Pessoa {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  tipoUsuario: number;
}

// Tipagem para cadastro de uma nova pessoa
export interface NovaPessoa {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  tipoUsuario: number;
  senha: string;
}

// Tipagem para o login
export interface LoginPessoa {
  email: string;
  senha: string;
}

// 📌 Cadastrar uma nova pessoa
export const cadastrarPessoa = async (
  pessoa: NovaPessoa
): Promise<Pessoa | null> => {
  try {
    const response = await api.post<Pessoa>("/pessoa/cadastrar", pessoa);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar pessoa:", error);
    return null;
  }
};

// 📌 Fazer login de uma pessoa
export const loginPessoa = async (
  login: LoginPessoa
): Promise<string | null> => {
  try {
    const response = await api.post<{ token: string }>("/pessoa/login", login);
    return response.data.token;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return null;
  }
};
