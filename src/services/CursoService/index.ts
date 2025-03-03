import { api } from "../API";

// Tipagem do Curso
export interface Curso {
  id: number;
  nome: string;
  descricao: string;
  duracaoEmHoras: number;
  alunos: unknown[]; // caso precise listar alunos, ou deixe vazio
  professores: unknown[]; // caso precise listar professores, ou deixe vazio
}

// Service para Cursos
const CursoService = {
  // Buscar todos os cursos
  getAll: async (): Promise<Curso[]> => {
    try {
      const response = await api.get<Curso[]>("/curso");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar curso:", error);
      throw error;
    }
  },

  // Buscar um curso pelo ID
  getById: async (id: number): Promise<Curso> => {
    try {
      const response = await api.get<Curso>(`/curso/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar curso com ID ${id}:`, error);
      throw error;
    }
  },

  // Criar um novo curso
  create: async (curso: Omit<Curso, "id">): Promise<Curso> => {
    try {
      const response = await api.post<Curso>("/curso", curso);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      throw error;
    }
  },

  // Atualizar um curso existente
  update: async (id: number, curso: Omit<Curso, "id">): Promise<Curso> => {
    try {
      const response = await api.put<Curso>(`/curso/${id}`, curso);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar curso com ID ${id}:`, error);
      throw error;
    }
  },

  // Deletar um curso
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/curso/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir curso com ID ${id}:`, error);
      throw error;
    }
  },
};

export default CursoService;
