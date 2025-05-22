// src/services/NotaService.ts
import { api } from "..";
import type { Nota, NovaNota } from "../../types";

const NotaService = {
  getAll: async (): Promise<Nota[]> => {
    const response = await api.get<Nota[]>("/nota");
    return response.data;
  },

  cadastrar: async (nota: NovaNota): Promise<any> => {
    const response = await api.post("/nota", nota);
    return response.data;
  },

  editar: async (nota: Nota): Promise<any> => {
    const response = await api.put(`/nota/${nota.id}`, nota);
    return response.data;
  },

  excluir: async (id: number): Promise<any> => {
    const response = await api.delete(`/nota/${id}`);
    return response.data;
  },
};

export default NotaService;
