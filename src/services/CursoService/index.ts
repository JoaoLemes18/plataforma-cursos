import { api } from "..";
import type { Curso } from "../../types";

const CursoService = {
  getAll: async (): Promise<Curso[]> => {
    const response = await api.get<Curso[]>("/curso");
    return response.data;
  },

  cadastrar: async (curso: Omit<Curso, "id">): Promise<any> => {
    const response = await api.post("/curso", curso);
    return response.data;
  },

  editar: async (curso: Curso): Promise<any> => {
    const response = await api.put(`/curso/${curso.id}`, curso);
    return response.data;
  },

  excluir: async (id: number): Promise<any> => {
    const response = await api.delete(`/curso/${id}`);
    return response.data;
  },
};

export default CursoService;
