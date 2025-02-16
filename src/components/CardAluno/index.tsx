import React from "react";
import "./styles.scss";

interface Aluno {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string;
  onDelete: () => void;
}

interface CardAlunoProps {
  aluno: Aluno;
}

const CardAluno: React.FC<CardAlunoProps> = ({ aluno }) => {
  const idade =
    new Date().getFullYear() - new Date(aluno.dataNascimento).getFullYear();

  return (
    <div className="aluno-card">
      <h3>{aluno.nome}</h3>
      <p>
        <strong>Email:</strong> {aluno.email}
      </p>
      <p>
        <strong>Data de Nascimento:</strong>{" "}
        {new Date(aluno.dataNascimento).toLocaleDateString()}
      </p>
      <p>
        <strong>Idade:</strong> {idade} anos
      </p>
    </div>
  );
};

export default CardAluno;
