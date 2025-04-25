import { api } from "..";

// Tipagem da Nota
export interface Nota {
  id: number;
  matriculaId: number;
  valor: number;
  dataLancamento: string;
  alunoId: number;
  cursoId: number;
  professorId: number;
}

export interface NovaNota {
  matriculaId: number;
  valor: number;
  dataLancamento: string;
  alunoId: number;
  cursoId: number;
  professorId: number;
}

// 📌 Buscar todas as notas
export const getNotas = async (): Promise<Nota[]> => {
  try {
    const response = await api.get<Nota[]>("/notas");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar notas:", error);
    return [];
  }
};

// 📌 Buscar uma nota pelo ID
export const getNotaById = async (id: number): Promise<Nota | null> => {
  try {
    const response = await api.get<Nota>(`/notas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar nota com ID ${id}:`, error);
    return null;
  }
};

// 📌 Criar uma nova nota
export const createNota = async (nota: NovaNota): Promise<Nota | null> => {
  try {
    const response = await api.post<Nota>("/notas", nota);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar nota:", error);
    return null;
  }
};

// 📌 Atualizar uma nota
export const updateNota = async (
  id: number,
  nota: Partial<NovaNota>
): Promise<Nota | null> => {
  try {
    const response = await api.put<Nota>(`/notas/${id}`, nota);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar nota com ID ${id}:`, error);
    return null;
  }
};

// 📌 Excluir uma nota
export const deleteNota = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/notas/${id}`);
    return true;
  } catch (error) {
    console.error(`Erro ao excluir nota com ID ${id}:`, error);
    return false;
  }
};
