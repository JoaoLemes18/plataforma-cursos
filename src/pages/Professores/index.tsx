import { useState } from "react";
import { createProfessor, Professor } from "../../services/ProfessorService";
import { Link } from "react-router-dom";
import "./styles.scss";
import { FaArrowLeft } from "react-icons/fa"; // Ícone de seta para voltar

const CadastrarProfessor: React.FC = () => {
  const [newProfessor, setNewProfessor] = useState<Omit<Professor, "id">>({
    nome: "",
    email: "",
    idade: 0,
    areaEspecializacao: "",
  });

  // Atualiza os inputs do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProfessor({ ...newProfessor, [e.target.name]: e.target.value });
  };

  // Cadastrar novo professor na API
  const handleAddProfessor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newProfessor.nome ||
      !newProfessor.email ||
      !newProfessor.idade ||
      !newProfessor.areaEspecializacao
    ) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    try {
      await createProfessor(newProfessor);
      alert("Professor cadastrado com sucesso!");
      setNewProfessor({
        nome: "",
        email: "",
        idade: 0,
        areaEspecializacao: "",
      });
    } catch (error) {
      console.error("Erro ao adicionar professor:", error);
    }
  };

  return (
    <div className="page-cadastrar-professor">
      {/* Header com botão de voltar e botão de ver professores */}
      <div className="header">
        <Link to="/" className="back-button">
          <FaArrowLeft />
        </Link>

        <Link to="/listar-professores" className="view-button">
          Ver Professores
        </Link>
      </div>

      <h2>Cadastrar Novo Professor</h2>

      <div className="form-container">
        <form onSubmit={handleAddProfessor}>
          <label>Nome do Professor</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o nome"
            value={newProfessor.nome}
            onChange={handleInputChange}
          />

          <label>Email do Professor</label>
          <input
            type="email"
            name="email"
            placeholder="Digite o email"
            value={newProfessor.email}
            onChange={handleInputChange}
          />

          <label>Idade do Professor</label>
          <input
            type="number"
            name="idade"
            placeholder="Digite a idade"
            value={newProfessor.idade}
            onChange={handleInputChange}
          />

          <label>Área de Especialização</label>
          <input
            type="text"
            name="areaEspecializacao"
            placeholder="Digite a especialização"
            value={newProfessor.areaEspecializacao}
            onChange={handleInputChange}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarProfessor;
