import { api } from "..";

export interface CriarMaterialPayload {
  nome: string;
  turmaId: number;
  arquivo: File;
}

export interface Material {
  id: number;
  nome: string;
  caminhoArquivo: string;
  dataEnvio: string;
  turmaId: number;
}

export const uploadMaterial = async (
  payload: CriarMaterialPayload
): Promise<Material> => {
  try {
    const formData = new FormData();
    formData.append("nome", payload.nome);
    formData.append("turmaId", payload.turmaId.toString());
    formData.append("arquivo", payload.arquivo);

    const response = await api.post("/materiais/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Material enviado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar material:", error);
    throw error;
  }
};

export const listarMateriaisPorTurma = async (
  turmaId: number
): Promise<Material[]> => {
  try {
    const response = await api.get(`/materiais/turma/${turmaId}`);
    console.log("Materiais da turma:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar materiais:", error);
    throw error;
  }
};

export const deletarMaterial = async (materialId: number): Promise<void> => {
  try {
    await api.delete(`/materiais/${materialId}`);
    console.log("Material deletado com sucesso");
  } catch (error) {
    console.error("Erro ao deletar material:", error);
    throw error;
  }
};
