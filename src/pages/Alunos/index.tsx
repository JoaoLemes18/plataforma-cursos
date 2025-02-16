import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardAluno from "../../components/CardAluno";
import "./styles.scss";

// Definição da interface Aluno
interface Aluno {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string;
}

// Dados mockados
const mockAlunos: Aluno[] = [
  {
    id: 1,
    nome: "João Pereira",
    email: "joao.pereira@email.com",
    dataNascimento: "2000-05-15",
  },
  {
    id: 2,
    nome: "Ana Oliveira",
    email: "ana.oliveira@email.com",
    dataNascimento: "1998-08-30",
  },
  {
    id: 3,
    nome: "Pedro Costa",
    email: "pedro.costa@email.com",
    dataNascimento: "2002-12-02",
  },
];

const Alunos: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>(mockAlunos);
  const [newAluno, setNewAluno] = useState<Aluno>({
    id: 0,
    nome: "",
    email: "",
    dataNascimento: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAluno({ ...newAluno, [e.target.name]: e.target.value });
  };

  const handleAddAluno = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAluno.nome || !newAluno.email || !newAluno.dataNascimento) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    const updatedAlunos = [...alunos, { ...newAluno, id: alunos.length + 1 }];

    setAlunos(updatedAlunos);
    setNewAluno({ id: 0, nome: "", email: "", dataNascimento: "" });
  };

  const handleDeleteAluno = (id: number) => {
    const updatedAlunos = alunos.filter((aluno) => aluno.id !== id);
    setAlunos(updatedAlunos);
  };

  return (
    <div className="alunos-container">
      <h2>Gerenciamento de Alunos</h2>

      {/* Formulário de Cadastro */}
      <div className="form-container">
        <h3>Cadastrar Novo Aluno</h3>
        <form onSubmit={handleAddAluno}>
          <input
            type="text"
            name="nome"
            placeholder="Nome do Aluno"
            value={newAluno.nome}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newAluno.email}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="dataNascimento"
            placeholder="Data de Nascimento"
            value={newAluno.dataNascimento}
            onChange={handleInputChange}
          />
          <button type="submit">Adicionar Aluno</button>
        </form>
      </div>

      <div className="alunos-list">
        {alunos.map((aluno) => (
          <CardAluno
            key={aluno.id}
            aluno={aluno}
            onDelete={() => handleDeleteAluno(aluno.id)}
          />
        ))}
      </div>

      <Link to="/" className="back-button">
        Voltar para Home
      </Link>
    </div>
  );
};

export default Alunos;
