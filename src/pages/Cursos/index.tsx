import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importando Link para navegação
import CursoService from "../../services/CursoService"; // Importando o serviço de cursos
import { FaArrowLeft } from "react-icons/fa"; // Para o ícone de seta
import "./styles.scss";

const CadastrarCurso: React.FC = () => {
  const [newCurso, setNewCurso] = useState({
    nome: "",
    descricao: "",
    duracaoEmHoras: 0,
  });

  // Atualiza os inputs do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCurso({ ...newCurso, [e.target.name]: e.target.value });
  };

  // Cadastrar novo curso na API
  const handleAddCurso = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCurso.nome || !newCurso.descricao || !newCurso.duracaoEmHoras) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    try {
      await CursoService.create(newCurso); // Usando o método create diretamente
      alert("Curso cadastrado com sucesso!");
      setNewCurso({
        nome: "",
        descricao: "",
        duracaoEmHoras: 0,
      });
    } catch (error) {
      console.error("Erro ao adicionar curso:", error);
    }
  };

  return (
    <div className="page-cadastrar-curso">
      {/* Header com botão de voltar e botão de ver cursos */}
      <div className="header">
        <Link to="/" className="back-button">
          <FaArrowLeft />
        </Link>

        <Link to="/listar-cursos" className="view-button">
          Ver Cursos Cadastrados
        </Link>
      </div>

      <h2>Cadastrar Novo Curso</h2>

      <div className="form-container">
        <form onSubmit={handleAddCurso}>
          <label>Nome do Curso</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o nome"
            value={newCurso.nome}
            onChange={handleInputChange}
          />

          <label>Descrição do Curso</label>
          <input
            type="text"
            name="descricao"
            placeholder="Digite a descrição"
            value={newCurso.descricao}
            onChange={handleInputChange}
          />

          <label>Duração do Curso (em horas)</label>
          <input
            type="number"
            name="duracaoEmHoras"
            placeholder="Digite a duração"
            value={newCurso.duracaoEmHoras}
            onChange={handleInputChange}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarCurso;
