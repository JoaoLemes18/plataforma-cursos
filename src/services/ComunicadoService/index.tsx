import { api } from "..";

export interface CriarComunicadoPayload {
  titulo: string;
  mensagem: string;
  dataInicio?: string;
  dataFim?: string;
  imagemFile?: File | null;
}

export interface Comunicado {
  id: number;
  titulo: string;
  mensagem: string;
  dataInicio?: string;
  dataFim?: string;
  urlImagem?: string;
}

export const criarComunicado = async (
  comunicado: CriarComunicadoPayload
): Promise<Comunicado> => {
  try {
    const formData = new FormData();
    formData.append("titulo", comunicado.titulo);
    formData.append("mensagem", comunicado.mensagem);
    if (comunicado.dataInicio)
      formData.append("dataInicio", comunicado.dataInicio);
    if (comunicado.dataFim) formData.append("dataFim", comunicado.dataFim);
    if (comunicado.imagemFile) formData.append("imagem", comunicado.imagemFile);

    const response = await api.post("/comunicado/CriarComImagem", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Comunicado criado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar comunicado:", error);
    throw error;
  }
};

export const listarComunicadosAtivos = async (): Promise<Comunicado[]> => {
  try {
    const response = await api.get("/comunicado/ativos");
    console.log("Comunicados ativos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar comunicados ativos:", error);
    throw error;
  }
};
