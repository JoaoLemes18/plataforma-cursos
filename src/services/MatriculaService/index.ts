import { api } from "..";
import type { Matricula, NovaMatricula } from "../../types";

const MatriculaService = {
  getAll: async (): Promise<Matricula[]> => {
    const response = await api.get<Matricula[]>("/matricula");
    return response.data;
  },

  cadastrar: async (matricula: NovaMatricula): Promise<any> => {
    const response = await api.post("/matricula", matricula);
    return response.data;
  },

  editarStatus: async (id: number, status: number): Promise<any> => {
    const response = await api.patch(`/matricula/${id}/status`, { status });
    return response.data;
  },

  cancelar: async (id: number): Promise<any> => {
    const response = await api.delete(`/matricula/${id}`);
    return response.data;
  },
};

export default MatriculaService;
