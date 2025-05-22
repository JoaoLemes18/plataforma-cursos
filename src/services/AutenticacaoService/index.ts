import { api } from "..";
import { NovaPessoa, LoginPessoa } from "../../types";

export const cadastrarPessoa = async (pessoa: NovaPessoa): Promise<any> => {
  try {
    const response = await api.post("/pessoa/cadastrar", pessoa);
    console.log("Cadastro realizado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar pessoa:", error);
    throw error;
  }
};

export const loginPessoa = async (login: LoginPessoa): Promise<any> => {
  try {
    const response = await api.post("/pessoa/login", login);
    console.log("Resposta da API:", response);
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};
