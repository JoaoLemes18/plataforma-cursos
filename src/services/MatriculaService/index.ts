import { api } from "..";

export interface Matricula {
  id: number;
  alunoId: number;
  cursoId: number;
  status: number;
  dataMatricula: string;
}

export interface NovaMatricula {
  alunoId: number;
  cursoId: number;
  status: number;
}

// Buscar todas as matrículas
export const getMatriculas = async (): Promise<Matricula[]> => {
  try {
    const response = await api.get("/matricula");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar matrículas:", error);
    return [];
  }
};

// Buscar uma matrícula pelo ID
export const getMatriculaById = async (
  id: number
): Promise<Matricula | null> => {
  try {
    const response = await api.get<Matricula>(`/matricula/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar matrícula com ID ${id}:`, error);
    return null;
  }
};

// Criar uma nova matrícula
export const createMatricula = async (
  matricula: NovaMatricula
): Promise<Matricula | null> => {
  try {
    const response = await api.post<Matricula>("/matricula", matricula);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar matrícula:", error);
    return null;
  }
};

// Atualizar uma matrícula
export const updateMatricula = async (
  id: number,
  matricula: Partial<NovaMatricula>
): Promise<Matricula | null> => {
  try {
    const response = await api.put<Matricula>(`/matricula/${id}`, matricula);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar matrícula com ID ${id}:`, error);
    return null;
  }
};

// Excluir uma matrícula
export const deleteMatricula = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/matricula/${id}`);
    return true;
  } catch (error) {
    console.error(`Erro ao excluir matrícula com ID ${id}:`, error);
    return false;
  }
};
