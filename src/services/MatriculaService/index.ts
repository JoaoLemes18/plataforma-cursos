import { api } from "..";
import type { Matricula, NovaMatricula, Material } from "../../types";

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

  listarMateriaisDoAlunoNaTurma: async (
    pessoaId: number,
    turmaId: number
  ): Promise<Material[]> => {
    const response = await api.get<Material[]>(
      `/matricula/pessoa/${pessoaId}/turma/${turmaId}/materiais`
    );
    return response.data;
  },

  // ✅ Novo método para buscar matrículas de um aluno específico
  getByAlunoId: async (alunoId: number): Promise<Matricula[]> => {
    const response = await api.get<Matricula[]>(`/matricula/aluno/${alunoId}`);
    return response.data;
  },
};

export default MatriculaService;
