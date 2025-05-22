import { api } from "..";
import type { Turma, NovaTurma } from "../../types";

const TurmaService = {
  getAll: async (): Promise<Turma[]> => {
    const response = await api.get<Turma[]>("/turma");
    return response.data;
  },

  cadastrar: async (turma: NovaTurma): Promise<any> => {
    const response = await api.post("/turma", turma);
    return response.data;
  },

  editar: async (turma: Turma): Promise<any> => {
    const response = await api.put(`/turma/${turma.id}`, turma);
    return response.data;
  },

  excluir: async (id: number): Promise<any> => {
    const response = await api.delete(`/turma/${id}`);
    return response.data;
  },
};

export default TurmaService;
