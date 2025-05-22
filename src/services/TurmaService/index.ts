import { api } from "..";

// Tipagem da Turma
export interface Turma {
  id: number;
  nome: string;
  descricao: string;
  capacidade: number;
  cursoId: number;
  professorId: number;
  cursoNome?: string;
  professorNome?: string;
}

// Interface para criar/atualizar turma
export interface NovaTurma {
  nome: string;
  descricao: string;
  capacidade: number;
  cursoId: number;
  professorId: number;
}

const getTurmas = async (): Promise<Turma[]> => {
  try {
    const response = await api.get<Turma[]>("/turma");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
    return [];
  }
};

const getTurmaById = async (id: number): Promise<Turma | null> => {
  try {
    const response = await api.get<Turma>(`/turma/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar turma com ID ${id}:`, error);
    return null;
  }
};

const createTurma = async (turma: NovaTurma): Promise<Turma> => {
  try {
    const response = await api.post<Turma>("/turma", turma);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar turma:", error);
    throw error; // <-- Lança o erro para o componente tratar
  }
};

const updateTurma = async (
  id: number,
  turma: Partial<Turma>
): Promise<Turma | null> => {
  try {
    const response = await api.put<Turma>(`/turma/${id}`, turma);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar turma com ID ${id}:`, error);
    return null;
  }
};

const deleteTurma = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/turma/${id}`);
    return true;
  } catch (error) {
    console.error(`Erro ao excluir turma com ID ${id}:`, error);
    return false;
  }
};

// Agrupa as funções no objeto exportado
const TurmaService = {
  getTurmas,
  getTurmaById,
  createTurma,
  updateTurma,
  deleteTurma,
};

export default TurmaService;
