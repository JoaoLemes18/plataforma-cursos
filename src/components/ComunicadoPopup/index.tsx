import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import {
  listarComunicadosAtivos,
  Comunicado,
} from "../../services/ComunicadoService";
import "./styles.scss";

const rotasPermitidas = [
  "/painel-aluno",
  "/painel-professor",
  "/painel-coordenador",
  "/painel-administrativo",
  "/painel-financeiro",
  "/home",
];

const ComunicadoPopup: React.FC = () => {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [mostrar, setMostrar] = useState(false);
  const [emRotaPermitida, setEmRotaPermitida] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setEmRotaPermitida(rotasPermitidas.includes(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    if (!emRotaPermitida) return;

    const visualizado = sessionStorage.getItem("comunicadoVisualizado");

    if (visualizado) {
      setMostrar(false);
      return;
    }

    const fetchComunicados = async () => {
      try {
        const dados = await listarComunicadosAtivos();
        if (dados && dados.length > 0) {
          setComunicados(dados);
          setMostrar(true);
        }
      } catch (error) {
        console.error("Erro ao carregar comunicados:", error);
      }
    };

    fetchComunicados();
  }, [emRotaPermitida]);

  if (!emRotaPermitida) return null;
  if (!mostrar || comunicados.length === 0) return null;

  const comunicado = comunicados[0];

  const imagem = comunicado.urlImagem ?? "";

  const urlImagem = imagem.startsWith("http")
    ? imagem
    : `https://localhost:7014/${imagem.replace(/^\/?/, "")}`;
  console.log("URL da imagem do comunicado:", urlImagem);

  const fecharPopup = () => {
    sessionStorage.setItem("comunicadoVisualizado", "true");
    setMostrar(false);
  };

  const modalContent = (
    <div
      className="comunicado-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comunicado-titulo"
      aria-describedby="comunicado-mensagem"
      onClick={fecharPopup} // Fecha clicando fora do modal
    >
      <div
        className="comunicado-modal"
        onClick={(e) => e.stopPropagation()} // Previne fechamento ao clicar dentro
      >
        <div className="comunicado-label">Comunicado:</div>

        <div className="comunicado-conteudo">
          <h2 id="comunicado-titulo">{comunicado.titulo}</h2>
          <p id="comunicado-mensagem">{comunicado.mensagem}</p>
          {imagem && (
            <img
              src={urlImagem}
              alt="Imagem do comunicado"
              className="comunicado-imagem"
            />
          )}
          <button className="comunicado-fechar" onClick={fecharPopup}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ComunicadoPopup;
