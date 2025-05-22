import { api } from "..";

// Tipagem da Matrícula
export interface Matricula {
  id: number;
  alunoNome: string;
  turmaNome: string;
  alunoId: number;
  turmaId: number;
  status: number;
  dataMatricula: string;
}

// Tipagem para criar nova matrícula
export interface NovaMatricula {
  pessoaId: number; // antes alunoId
  turmaId: number;
  status: number;
}

// 📌 Buscar todas as matrículas
export const getMatriculas = async (): Promise<Matricula[]> => {
  try {
    const response = await api.get<Matricula[]>("/matricula");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar matrículas:", error);
    return [];
  }
};

// 📌 Buscar uma matrícula pelo ID
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

// 📌 Criar uma nova matrícula
export const createMatricula = async (
  matricula: NovaMatricula
): Promise<Matricula | null> => {
  try {
    const matriculaParaCriar = {
      id: 0,
      ...matricula,
      dataMatricula: new Date().toISOString(),
    };
    const response = await api.post<Matricula>(
      "/matricula",
      matriculaParaCriar
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar matrícula:", error);
    return null;
  }
};

// 📌 Atualizar matrícula completa (PUT)
export const updateMatricula = async (
  id: number,
  matricula: Matricula
): Promise<Matricula | null> => {
  try {
    const response = await api.put<Matricula>(`/matricula/${id}`, matricula);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar matrícula com ID ${id}:`, error);
    return null;
  }
};

// 📌 Atualizar somente o status da matrícula (PATCH)
export const updateMatriculaStatus = async (
  id: number,
  status: number
): Promise<boolean> => {
  try {
    await api.patch(`/matricula/${id}/status`, { status });
    return true;
  } catch (error) {
    console.error(`Erro ao atualizar status da matrícula com ID ${id}:`, error);
    return false;
  }
};

// 📌 Excluir uma matrícula
export const deleteMatricula = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/matricula/${id}`);
    return true;
  } catch (error) {
    console.error(`Erro ao excluir matrícula com ID ${id}:`, error);
    return false;
  }
};
