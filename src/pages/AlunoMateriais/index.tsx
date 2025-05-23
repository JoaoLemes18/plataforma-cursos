import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import MatriculaService from "../../services/MatriculaService";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import "./styles.scss";

interface Material {
  id: number;
  nome: string;
  descricao?: string;
  caminhoArquivo?: string;
}

const getFileNameFromUrl = (url: string) => {
  return url.substring(url.lastIndexOf("/") + 1);
};

const AlunoMateriais: React.FC = () => {
  const { usuario } = useUser();
  const turmaId = usuario?.turmaId ?? null;
  const pessoaId = usuario?.id ?? null;

  const [materiais, setMateriais] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pessoaId || !turmaId) {
      setError("Dados insuficientes para carregar materiais.");
      setMateriais([]);
      setLoading(false);
      return;
    }

    const fetchMateriais = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await MatriculaService.listarMateriaisDoAlunoNaTurma(
          pessoaId,
          turmaId
        );
        setMateriais(data);
      } catch {
        setError("Erro ao carregar materiais.");
      } finally {
        setLoading(false);
      }
    };

    fetchMateriais();
  }, [pessoaId, turmaId]);

  const baixarPDF = (url: string) => {
    const baseUrl = "https://localhost:7014";
    const caminho = url.startsWith("/") ? url.substring(1) : url;

    const caminhoCodificado = caminho
      .split("/")
      .map((segmento) => encodeURIComponent(segmento))
      .join("/");

    const urlCompleta = `${baseUrl}/${caminhoCodificado}`;

    window.open(urlCompleta, "_blank"); // Abre numa aba nova, o navegador fará o download
  };
  if (error) return <div>{error}</div>;

  if (loading) return <div>Carregando materiais...</div>;

  if (materiais.length === 0) return <div>Nenhum material encontrado.</div>;

  return (
    <div className="page-aluno-materiais">
      <div className="header">
        <Link to="/painel-aluno" className="back-button">
          <FaArrowLeft />
        </Link>
      </div>

      <h1>Meus Materiais</h1>
      <ul>
        {materiais.map((material) => {
          const fileName = material.caminhoArquivo
            ? getFileNameFromUrl(material.caminhoArquivo)
            : "Sem arquivo";

          return (
            <li key={material.id}>
              <strong>{material.nome}</strong>
              {material.descricao && <p>{material.descricao}</p>}

              <p>
                <strong>Arquivo: </strong> {fileName}
              </p>

              {material.caminhoArquivo ? (
                <button onClick={() => baixarPDF(material.caminhoArquivo!)}>
                  Baixar PDF
                </button>
              ) : (
                <span>Arquivo indisponível</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AlunoMateriais;
