import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import "./styles.scss";

const ContratoAluno: React.FC = () => {
  const urlContrato = "/contrato-aluno.pdf";

  const { usuario } = useUser();

  const [aceitoContrato, setAceitoContrato] = useState(false);
  const [assinaturaFeita, setAssinaturaFeita] = useState(false);
  const [logAssinatura, setLogAssinatura] = useState<{
    nome: string;
    data: string;
  } | null>(null);

  const handleAssinar = () => {
    if (aceitoContrato && usuario) {
      const nomeUsuario = usuario.nome;
      const dataHora = new Date().toLocaleString("pt-BR");

      setLogAssinatura({ nome: nomeUsuario, data: dataHora });
      setAssinaturaFeita(true);
    }
  };

  return (
    <div className="page-aluno-materiais">
      <div className="header">
        <Link to="/painel-aluno" className="back-button" aria-label="Voltar">
          <FaArrowLeft />
        </Link>
      </div>
      <h2>Contrato de Matrícula</h2>

      <embed
        src={urlContrato}
        type="application/pdf"
        width="100%"
        height="700px"
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
            checked={aceitoContrato}
            onChange={(e) => setAceitoContrato(e.target.checked)}
          />
          Li e concordo com o contrato.
        </label>

        <button
          onClick={handleAssinar}
          disabled={!aceitoContrato || assinaturaFeita}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: aceitoContrato ? "#f45f2f" : "#ccc",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            cursor: aceitoContrato ? "pointer" : "not-allowed",
            transition: "background-color 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {assinaturaFeita ? <>Contrato Assinado</> : "Assinar Contrato"}
        </button>

        {assinaturaFeita && logAssinatura && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              background: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center", // Mantém central
              gap: "10px",
            }}
          >
            <FaCheckCircle color="#28a745" size={20} />
            <div style={{ marginTop: "-2px" }}>
              {" "}
              {/* ✅ Sobe só o texto */}
              <p>
                <strong>Assinado por:</strong> {logAssinatura.nome}
              </p>
              <p>
                <strong>Data/Hora:</strong> {logAssinatura.data}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContratoAluno;
