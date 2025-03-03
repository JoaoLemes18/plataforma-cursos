import { api } from "../API";

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

    console.log("Resposta da API:", response.data); // Debug: veja o formato da resposta

    // Garante que seja sempre um array
    if (response.data && Array.isArray(response.data.professores)) {
      return response.data.professores;
    }

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar professores:", error);
    return []; // Retorna um array vazio em caso de erro
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

// Atualizar um professor existente
export const updateProfessor = async (
  id: number,
  professor: Omit<Professor, "id">
): Promise<Professor | null> => {
  try {
    const response = await api.put<Professor>(`/professor/${id}`, professor);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar professor com ID ${id}:`, error);
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
