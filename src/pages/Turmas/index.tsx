import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import CursoService from "../../services/CursoService";
import PessoaService from "../../services/PessoaService";
import TurmaService from "../../services/TurmaService";
import "./styles.scss";

interface Curso {
  id: number;
  nome: string;
}

interface Pessoa {
  id: number;
  nome: string;
}

const Turmas: React.FC = () => {
  const [turmaData, setTurmaData] = useState({
    nome: "",
    cursoId: 0, // Mudei para number
    professorId: 0, // Mudei para number
    descricao: "",
    capacidade: 8,
  });

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [professores, setProfessores] = useState<Pessoa[]>([]);
  const [alunosMatriculados, setAlunosMatriculados] = useState<Pessoa[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cursosData = await CursoService.getAll();
        setCursos(cursosData);

        const profs = await PessoaService.getProfessores(); // <- Usar getProfessores
        console.log("Professores carregados:", profs);
        setProfessores(profs);
      } catch (error) {
        console.error("Erro ao carregar cursos e professores:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "cursoId") {
      const cursoIdNum = Number(value);
      setTurmaData({ ...turmaData, cursoId: cursoIdNum });

      if (cursoIdNum) {
        // Verifique se PessoaService tem método para buscar alunos por curso
        if (PessoaService.getAlunosPorCurso) {
          PessoaService.getAlunosPorCurso(cursoIdNum)
            .then((alunos) => setAlunosMatriculados(alunos))
            .catch((err) => {
              console.error("Erro ao buscar alunos matriculados:", err);
              setAlunosMatriculados([]);
            });
        } else {
          setAlunosMatriculados([]);
        }
      } else {
        setAlunosMatriculados([]);
      }
    } else if (name === "professorId") {
      setTurmaData({ ...turmaData, professorId: Number(value) });
    } else if (name === "capacidade") {
      let capNum = Number(value);
      if (capNum > 8) capNum = 8;
      if (capNum < 1) capNum = 1;
      setTurmaData({ ...turmaData, capacidade: capNum });
    } else {
      setTurmaData({ ...turmaData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turmaData.nome || !turmaData.cursoId || !turmaData.professorId) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const novaTurma = {
        nome: turmaData.nome,
        cursoId: turmaData.cursoId,
        professorId: turmaData.professorId,
        descricao: turmaData.descricao,
        capacidade: turmaData.capacidade,
      };

      await TurmaService.createTurma(novaTurma);

      alert("Turma cadastrada com sucesso!");

      // Limpa formulário e alunos matriculados
      setTurmaData({
        nome: "",
        cursoId: 0,
        professorId: 0,
        descricao: "",
        capacidade: 8,
      });
      setAlunosMatriculados([]);
    } catch (error) {
      console.error("Erro ao cadastrar turma:", error);
      alert("Erro ao cadastrar turma. Tente novamente.");
    }
  };

  return (
    <div className="page-cadastrar-turma">
      <div className="header">
        <Link to="/painel-coordenador" className="back-button">
          <FaArrowLeft />
        </Link>

        <Link to="/listar-turmas" className="view-button">
          Ver Turmas
        </Link>
      </div>

      <h2>Cadastrar Nova Turma</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <label>Nome da Turma</label>
        <input
          type="text"
          name="nome"
          value={turmaData.nome}
          onChange={handleInputChange}
          placeholder="Digite o nome da turma"
        />

        <label>Curso</label>
        <select
          name="cursoId"
          value={turmaData.cursoId || ""}
          onChange={handleInputChange}
        >
          <option value="">Selecione um curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nome}
            </option>
          ))}
        </select>

        <label>Professor Responsável</label>
        <select
          name="professorId"
          value={turmaData.professorId || ""}
          onChange={handleInputChange}
        >
          <option value="">Selecione um professor</option>
          {professores.map((prof) => (
            <option key={prof.id} value={prof.id}>
              {prof.nome}
            </option>
          ))}
        </select>

        <label>Capacidade Máxima de Alunos (até 8)</label>
        <input
          type="number"
          name="capacidade"
          value={turmaData.capacidade}
          onChange={handleInputChange}
          min={1}
          max={8}
        />

        <label>Descrição (opcional)</label>
        <textarea
          name="descricao"
          value={turmaData.descricao}
          onChange={handleInputChange}
          placeholder="Descrição da turma"
        />

        <button type="submit">Cadastrar Turma</button>
      </form>

      {alunosMatriculados.length > 0 && (
        <div className="alunos-matriculados">
          <h3>Alunos Matriculados no Curso Selecionado</h3>
          <ul>
            {alunosMatriculados.map((aluno) => (
              <li key={aluno.id}>{aluno.nome}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Turmas;
