import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./styles.scss";

interface Boleto {
  id: number;
  nome: string;
  caminhoArquivo: string;
  vencimento: string; // ISO date string
}

const getFileNameFromUrl = (url: string) => {
  return url.substring(url.lastIndexOf("/") + 1);
};

const calcularDiasRestantes = (dataVencimento: string) => {
  const hoje = new Date();
  const vencimento = new Date(dataVencimento);
  const diffTime = vencimento.getTime() - hoje.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const BoletosAluno: React.FC = () => {
  // Lista estática de boletos
  const boletos: Boleto[] = [
    {
      id: 1,
      nome: "Boleto Mensalidade - Maio",
      caminhoArquivo: "/boletos/maio.pdf",
      vencimento: "2025-05-30",
    },
    {
      id: 2,
      nome: "Boleto Mensalidade - Junho",
      caminhoArquivo: "/boletos/junho.pdf",
      vencimento: "2025-06-30",
    },
    {
      id: 3,
      nome: "Boleto Mensalidade - Julho",
      caminhoArquivo: "/boletos/julho.pdf",
      vencimento: "2025-07-30",
    },
    {
      id: 4,
      nome: "Boleto Mensalidade - Agosto",
      caminhoArquivo: "/boletos/agosto.pdf",
      vencimento: "2025-08-30",
    },
  ];

  const baixarPDF = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="page-boleto-aluno">
      <div className="header">
        <Link to="/painel-aluno" className="back-button" aria-label="Voltar">
          <FaArrowLeft />
        </Link>
      </div>
      
      <h2>Meus Boletos</h2>
      
      <ul>
        {boletos.map((boleto) => {
          const fileName = getFileNameFromUrl(boleto.caminhoArquivo);
          const diasRestantes = calcularDiasRestantes(boleto.vencimento);

          return (
            <li key={boleto.id}>
              <strong>{boleto.nome}</strong>
              <p>
                <strong>Arquivo: </strong> {fileName}
              </p>
              <p>
                Vencimento:{" "}
                {new Date(boleto.vencimento).toLocaleDateString("pt-BR")}
              </p>
              <p>
                {diasRestantes > 0 ? (
                  <>
                    Faltam <strong>{diasRestantes}</strong> dias para o
                    vencimento.
                  </>
                ) : diasRestantes === 0 ? (
                  <>
                    O boleto vence <strong>hoje</strong>.
                  </>
                ) : (
                  <>
                    O boleto venceu há{" "}
                    <strong>{Math.abs(diasRestantes)}</strong> dias.
                  </>
                )}
              </p>

              <button onClick={() => baixarPDF(boleto.caminhoArquivo)}>
                Baixar Boleto
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BoletosAluno;
