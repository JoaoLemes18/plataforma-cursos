import { api } from "..";

export interface Professor {
  id: number;
  nome: string;
  email: string;
  idade: number;
  areaEspecializacao: string;
}

// Buscar todos os professores
export const getProfessores = async (): Promise<Professor[]> => {
  try {
    const response = await api.get("/professor/");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar professores:", error);
    return [];
  }
};

// Buscar um professor pelo ID
export const getProfessorById = async (
  id: number
): Promise<Professor | null> => {
  try {
    const response = await api.get<Professor>(`/professor/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar professor com ID ${id}:`, error);
    return null;
  }
};

// Cadastrar um novo professor
export const createProfessor = async (
  professor: Omit<Professor, "id">
): Promise<Professor | null> => {
  try {
    const response = await api.post<Professor>("/professor/", professor);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar professor:", error);
    return null;
  }
};

// Excluir um professor
export const deleteProfessor = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/professor/${id}`);
    return true;
  } catch (error) {
    console.error(`Erro ao excluir professor com ID ${id}:`, error);
    return false;
  }
};
