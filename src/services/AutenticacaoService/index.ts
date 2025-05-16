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
export const cadastrarPessoa = async (pessoa: NovaPessoa): Promise<void> => {
  try {
    const response = await api.post("/pessoa/cadastrar", pessoa);
    console.log("Cadastro realizado com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao cadastrar pessoa:", error);
  }
};

// 📌 Fazer login de uma pessoa
export const loginPessoa = async (login: { email: string; senha: string; }) => {
  try {
    const response = await api.post("/pessoa/login", login);
    console.log("Resposta da API:", response); // Log da resposta completa
    return response.data; // Retorna o conteúdo da resposta que já contém a propriedade 'mensagem'
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error; // Lança o erro para ser tratado no frontend
  }
};
