export interface ValidacaoResultado<T> {
  valido: boolean;
  erros: { [key in keyof T]?: boolean };
}

export function validarCadastroPessoa<T extends {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  senha: string;
}>(dados: T): ValidacaoResultado<T> {
  const erros: { [key in keyof T]?: boolean } = {};

  if (!dados.nome.trim()) erros.nome = true;
  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(dados.cpf)) erros.cpf = true;
  if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(dados.email)) erros.email = true;
  if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(dados.telefone)) erros.telefone = true;
  if (!dados.senha.trim()) erros.senha = true;

  return { valido: Object.keys(erros).length === 0, erros };
}

export function validarLoginPessoa<T extends {
  email: string;
  senha: string;
}>(dados: T): ValidacaoResultado<T> {
  const erros: { [key in keyof T]?: boolean } = {};

  if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(dados.email)) erros.email = true;
  if (!dados.senha.trim()) erros.senha = true;

  return { valido: Object.keys(erros).length === 0, erros };
}
