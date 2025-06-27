// src/services/PessoaService.ts
import { api } from "..";
import type { Pessoa, NovaPessoa, LoginPessoa } from "../../types";

export const cadastrarPessoa = async (pessoa: NovaPessoa): Promise<any> => {
  try {
    const response = await api.post("/pessoa/cadastrar", pessoa);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginPessoa = async (login: LoginPessoa) => {
  try {
    const response = await api.post("/pessoa/login", login);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const PessoaService = {
  getAlunos: async (): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>("/pessoa/alunos");
    return response.data;
  },

  getProfessores: async (): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>("/pessoa/professores");
    return response.data;
  },

  getAll: async (): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>("/pessoa");
    return response.data;
  },

  editar: async (id: number, pessoa: NovaPessoa): Promise<any> => {
    try {
      const response = await api.put(`/pessoa/${id}`, pessoa);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  excluir: async (id: number): Promise<void> => {
    try {
      await api.delete(`/pessoa/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default PessoaService;
