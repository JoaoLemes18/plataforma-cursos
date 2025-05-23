export interface FormDataCadastro {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  tipo: number;
  senha: string;
}

export type FormErrorsCadastro = {
  [key in keyof FormDataCadastro]?: boolean;
};

export interface FormDataLogin {
  email: string;
  password: string;
  loading: boolean;
  emailErro: boolean;
  senhaErro: boolean;
}

// Pessoa
export interface Pessoa {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  tipoUsuario: number;
}

export interface NovaPessoa {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  tipoUsuario: number;
  senha: string;
}

export interface LoginPessoa {
  email: string;
  senha: string;
}

// Curso
export interface Curso {
  id: number;
  nome: string;
  descricao: string;
  duracaoEmHoras: string;
}

// Matricula
export interface Matricula {
  id: number;
  alunoNome: string;
  turmaNome: string;
  alunoId: number;
  turmaId: number;
  status: number;
  dataMatricula: string;
}

export interface NovaMatricula {
  pessoaId: number;
  turmaId: number;
  status: number;
}

// Nota
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

// Turma
export interface Turma {
  id: number;
  nome: string;
  descricao: string;
  capacidade: number;
  cursoId: number;
  professorId: number;
  cursoNome?: string;
  professorNome?: string;
}

export interface NovaTurma {
  nome: string;
  descricao: string;
  capacidade: number;
  cursoId: number;
  professorId: number;
}

export interface Material {
  id: number;
  nome: string;
  caminhoArquivo: string;
  dataEnvio: string; // ISO string
  turmaId: number;
}