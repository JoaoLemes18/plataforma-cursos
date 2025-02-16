import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardProfessor from "../../components/CardProfessor";
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
  cursoId: number; // Chave estrangeira para o curso
  cursoNome: string; // Nome do curso
}

const mockProfessores: Professor[] = [
  {
    id: 1,
    nome: "Carlos Silva",
    email: "carlos.silva@email.com",
    areaEspecializacao: "Matemática",
    cursoId: 1,
    cursoNome: "Matemática",
  },
  {
    id: 2,
    nome: "Mariana Souza",
    email: "mariana.souza@email.com",
    areaEspecializacao: "Física",
    cursoId: 2,
    cursoNome: "Física",
  },
  {
    id: 3,
    nome: "Rafael Costa",
    email: "rafael.costa@email.com",
    areaEspecializacao: "Programação",
    cursoId: 3,
    cursoNome: "Programação",
  },
];

const mockCursos: Curso[] = [
  { id: 1, nome: "Matemática" },
  { id: 2, nome: "Física" },
  { id: 3, nome: "Programação" },
];

const Professores: React.FC = () => {
  const [professores, setProfessores] = useState<Professor[]>(mockProfessores);
  const [cursos, setCursos] = useState<Curso[]>(mockCursos);
  const [newProfessor, setNewProfessor] = useState<Professor>({
    id: 0,
    nome: "",
    email: "",
    areaEspecializacao: "",
    cursoId: 0,
    cursoNome: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProfessor({ ...newProfessor, [e.target.name]: e.target.value });
  };

  const handleAddProfessor = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newProfessor.nome ||
      !newProfessor.email ||
      !newProfessor.areaEspecializacao ||
      !newProfessor.cursoId
    ) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    const updatedProfessores = [
      ...professores,
      { ...newProfessor, id: professores.length + 1 },
    ];

    setProfessores(updatedProfessores);
    setNewProfessor({
      id: 0,
      nome: "",
      email: "",
      areaEspecializacao: "",
      cursoId: 0,
      cursoNome: "",
    });
  };

  const handleDeleteProfessor = (id: number) => {
    const updatedProfessores = professores.filter(
      (professor) => professor.id !== id
    );
    setProfessores(updatedProfessores);
  };

  const handleEditProfessor = (id: number) => {
    const professorToEdit = professores.find(
      (professor) => professor.id === id
    );
    if (professorToEdit) {
      setNewProfessor(professorToEdit);
    }
  };

  const handleUpdateProfessor = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newProfessor.nome ||
      !newProfessor.email ||
      !newProfessor.areaEspecializacao ||
      !newProfessor.cursoId
    ) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    const updatedProfessores = professores.map((professor) =>
      professor.id === newProfessor.id ? newProfessor : professor
    );

    setProfessores(updatedProfessores);
    setNewProfessor({
      id: 0,
      nome: "",
      email: "",
      areaEspecializacao: "",
      cursoId: 0,
      cursoNome: "",
    });
  };

  return (
    <div className="professores-container">
      <h2>Gerenciamento de Professores</h2>

      {/* Formulário de Cadastro ou Edição */}
      <div className="form-container">
        <h3>
          {newProfessor.id ? "Editar Professor" : "Cadastrar Novo Professor"}
        </h3>
        <form
          onSubmit={
            newProfessor.id ? handleUpdateProfessor : handleAddProfessor
          }
        >
          <input
            type="text"
            name="nome"
            placeholder="Nome do Professor"
            value={newProfessor.nome}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newProfessor.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="areaEspecializacao"
            placeholder="Área de Especialização"
            value={newProfessor.areaEspecializacao}
            onChange={handleInputChange}
          />

          <button type="submit">
            {newProfessor.id ? "Atualizar Professor" : "Adicionar Professor"}
          </button>
        </form>
      </div>

      {/* Listagem de professores */}
      <div className="professores-list">
        {professores.map((professor) => (
          <CardProfessor
            key={professor.id}
            professor={professor}
            cursos={cursos}
            onDelete={() => handleDeleteProfessor(professor.id)}
            onEdit={() => handleEditProfessor(professor.id)}
          />
        ))}
      </div>

      <Link to="/" className="back-button">
        Voltar para Home
      </Link>
    </div>
  );
};

export default Professores;
