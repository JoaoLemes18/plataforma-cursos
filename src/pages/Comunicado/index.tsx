import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { criarComunicado } from "../../services/ComunicadoService";
import "./styles.scss";

interface NovoComunicadoState {
  titulo: string;
  mensagem: string;
  dataInicio: string;
  dataFim: string;
  imagemFile: File | null;
}

const CadastrarComunicado: React.FC = () => {
  const [comunicado, setComunicado] = useState<NovoComunicadoState>({
    titulo: "",
    mensagem: "",
    dataInicio: "",
    dataFim: "",
    imagemFile: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setComunicado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setComunicado((prev) => ({
        ...prev,
        imagemFile: e.target.files![0],
      }));
    } else {
      setComunicado((prev) => ({
        ...prev,
        imagemFile: null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comunicado.titulo || !comunicado.mensagem) {
      alert("Preencha todos os campos obrigatórios (Título e Mensagem).");
      return;
    }

    try {
      await criarComunicado({
        titulo: comunicado.titulo,
        mensagem: comunicado.mensagem,
        dataInicio: comunicado.dataInicio || undefined,
        dataFim: comunicado.dataFim || undefined,
        imagemFile: comunicado.imagemFile,
      });

      alert("Comunicado criado com sucesso!");
      setComunicado({
        titulo: "",
        mensagem: "",
        dataInicio: "",
        dataFim: "",
        imagemFile: null,
      });
      // opcional: redirecionar ou atualizar lista
    } catch (error) {
      alert("Erro ao criar comunicado. Tente novamente.");
    }
  };

  return (
    <div className="page-cadastrar-comunicado">
      <div className="header">
        <Link to="/painel-coordenador" className="back-button" title="Voltar">
          <FaArrowLeft />
        </Link>
      </div>

      <h2>Cadastrar Novo Comunicado</h2>

      <div className="form-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="titulo">Título *</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={comunicado.titulo}
            onChange={handleInputChange}
            placeholder="Título do comunicado"
            required
          />

          <label htmlFor="mensagem">Mensagem *</label>
          <textarea
            id="mensagem"
            name="mensagem"
            value={comunicado.mensagem}
            onChange={handleInputChange}
            placeholder="Digite a mensagem do comunicado"
            rows={6}
            required
          />

          <label htmlFor="dataInicio">Data Início</label>
          <input
            type="date"
            id="dataInicio"
            name="dataInicio"
            value={comunicado.dataInicio}
            onChange={handleInputChange}
          />

          <label htmlFor="dataFim">Data Fim</label>
          <input
            type="date"
            id="dataFim"
            name="dataFim"
            value={comunicado.dataFim}
            onChange={handleInputChange}
          />

          <label htmlFor="imagemFile">Imagem (opcional)</label>
          <input
            type="file"
            id="imagemFile"
            name="imagemFile"
            accept="image/*"
            onChange={handleFileChange}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarComunicado;
