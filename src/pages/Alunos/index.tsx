import { useState } from "react";
import AlunoService from "../../services/AlunoService";
import { Link } from "react-router-dom";
import "./styles.scss";
import { FaArrowLeft } from "react-icons/fa"; // Ícone de seta para voltar

const CadastrarAluno: React.FC = () => {
  const [newAluno, setNewAluno] = useState<Omit<Aluno, "id">>({
    nome: "",
    email: "",
    idade: 0,
    matricula: "",
  });

  // Atualiza os inputs do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAluno({ ...newAluno, [e.target.name]: e.target.value });
  };

  // Cadastrar novo aluno na API
  const handleAddAluno = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newAluno.nome ||
      !newAluno.email ||
      !newAluno.idade ||
      !newAluno.matricula
    ) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    try {
      await AlunoService.create(aluno);
      alert("Aluno cadastrado com sucesso!");
      setNewAluno({
        nome: "",
        email: "",
        idade: 0,
        matricula: "",
      });
    } catch (error) {
      console.error("Erro ao adicionar aluno:", error);
    }
  };

  return (
    <div className="page-cadastrar-aluno">
      {/* Header com botão de voltar e botão de ver alunos */}
      <div className="header">
        <Link to="/" className="back-button">
          <FaArrowLeft />
        </Link>

        <Link to="/listar-alunos" className="view-button">
          Ver Alunos
        </Link>
      </div>

      <h2>Cadastrar Novo Aluno</h2>

      <div className="form-container">
        <form onSubmit={handleAddAluno}>
          <label>Nome do Aluno</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o nome"
            value={newAluno.nome}
            onChange={handleInputChange}
          />

          <label>Email do Aluno</label>
          <input
            type="email"
            name="email"
            placeholder="Digite o email"
            value={newAluno.email}
            onChange={handleInputChange}
          />

          <label>Idade do Aluno</label>
          <input
            type="number"
            name="idade"
            placeholder="Digite a idade"
            value={newAluno.idade}
            onChange={handleInputChange}
          />

          <label>Matricula do Aluno</label>
          <input
            type="text"
            name="matricula"
            placeholder="Digite o matricula"
            value={newAluno.matricula}
            onChange={handleInputChange}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarAluno;
