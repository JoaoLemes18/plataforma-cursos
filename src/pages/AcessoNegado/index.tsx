import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const AcessoNegado: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <FaLock size={60} color="#d9534f" style={{ marginBottom: 20 }} />
      <h1 style={styles.title}>Acesso Negado</h1>
      <p style={styles.message}>
        Você não tem permissão para acessar esta página.
      </p>
      <button style={styles.button} onClick={() => navigate("/login")}>
        Voltar ao Login
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    padding: "80px 20px",
    height: "100vh",
  },
  title: {
    fontSize: 28,
    color: "#d9534f",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
  },
};

export default AcessoNegado;
