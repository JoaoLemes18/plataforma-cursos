import { api } from "..";

export interface Pessoa {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  tipoUsuario: number; // 1 = Aluno, 2 = Professor, ...
}

const PessoaService = {
  // Listar todos os alunos
  getAlunos: async (): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>("/pessoa/alunos");
    return response.data;
  },

  // Listar todos os professores
  getProfessores: async (): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>("/pessoa/professores");
    return response.data;
  },

  // Caso queira listar todos (sem filtro)
  getAll: async (): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>("/pessoa");
    return response.data;
  },
};

export default PessoaService;
