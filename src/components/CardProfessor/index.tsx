import React from "react";
import "./styles.scss";
interface Curso {
  id: number;
  nome: string;
}

interface Professor {
  id: number;
  nome: string;
  email: string;
  areaEspecializacao: string;
  cursoId: number;
}

interface CardProfessorProps {
  professor: Professor;
  cursos: Curso[];
  onDelete: () => void;
  onEdit: () => void;
}

const CardProfessor: React.FC<CardProfessorProps> = ({ professor, cursos }) => {
  const curso = cursos.find((curso) => curso.id === professor.cursoId);

  return (
    <div className="professor-card">
      <h3>{professor.nome}</h3>
      <p>
        <strong>Email:</strong> {professor.email}
      </p>
      <p>
        <strong>Especialização:</strong> {professor.areaEspecializacao}
      </p>
      <p>
        <strong>Curso:</strong> {curso ? curso.nome : "Curso não encontrado"}
      </p>
    </div>
  );
};

export default CardProfessor;
