import { api } from "../API";

// Tipagem do Aluno
export interface Aluno {
  id: number;
  nome: string;
  email: string;
  idade: number;
  matricula: string;
}

// Service para Alunos
const AlunoService = {
  // Buscar todos os alunos
  getAll: async (): Promise<Aluno[]> => {
    try {
      const response = await api.get<Aluno[]>("/aluno");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      throw error;
    }
  },

  // Buscar um aluno pelo ID
  getById: async (id: number): Promise<Aluno> => {
    try {
      const response = await api.get<Aluno>(`/aluno/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar aluno com ID ${id}:`, error);
      throw error;
    }
  },

  // Cadastrar um novo aluno
  create: async (aluno: Omit<Aluno, "id">): Promise<Aluno> => {
    try {
      const response = await api.post<Aluno>("/aluno", aluno);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      throw error;
    }
  },

  // Atualizar um aluno existente
  update: async (id: number, aluno: Omit<Aluno, "id">): Promise<Aluno> => {
    try {
      const response = await api.put<Aluno>(`/aluno/${id}`, aluno);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar aluno com ID ${id}:`, error);
      throw error;
    }
  },

  // Excluir um aluno
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/aluno/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir aluno com ID ${id}:`, error);
      throw error;
    }
  },
};

export default AlunoService;
