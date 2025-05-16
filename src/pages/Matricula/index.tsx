import { useState, useEffect } from "react";
import { createMatricula } from "../../services/MatriculaService";
import AlunoService from "../../services/AlunoService";
import CursoService from "../../services/CursoService";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./style.scss";

interface Aluno {
  id: number;
  nome: string;
}

interface Curso {
  id: number;
  nome: string;
}

const CadastrarMatricula: React.FC = () => {
  const [newMatricula, setNewMatricula] = useState({
    alunoId: "",
    cursoId: "",
    status: "1",
  });

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alunosData = await AlunoService.getAll();
        const cursosData = await CursoService.getAll();

        setAlunos(alunosData);
        setCursos(cursosData);
      } catch (error) {
        console.error("Erro ao carregar alunos e cursos:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewMatricula({ ...newMatricula, [e.target.name]: e.target.value });
  };

  const handleAddMatricula = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatricula.alunoId || !newMatricula.cursoId) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    // Convertendo status para número e formatando corretamente
    const matriculaData = {
      alunoId: Number(newMatricula.alunoId),
      cursoId: Number(newMatricula.cursoId),
      status: Number(newMatricula.status),
    };
    console.log("Dados corrigidos para API:", matriculaData); // Debug

    try {
      await createMatricula(matriculaData);
      alert("Matrícula realizada com sucesso!");
      setNewMatricula({ alunoId: "", cursoId: "", status: "1" });
    } catch (error) {
      console.error("Erro ao cadastrar matrícula:", error);
      alert("Erro ao cadastrar matrícula. Tente novamente.");
    }
  };

  return (
    <div className="page-cadastrar-matricula">
      <div className="header">
        <Link to="/painel-coordenador" className="back-button">
          <FaArrowLeft />
        </Link>
        <Link to="/listar-matriculas" className="view-button">
          Ver Matrículas
        </Link>
      </div>

      <h2>Cadastrar Nova Matrícula</h2>
      <div className="form-container">
        <form onSubmit={handleAddMatricula}>
          <label>Aluno</label>
          <select
            name="alunoId"
            value={newMatricula.alunoId}
            onChange={handleInputChange}
          >
            <option value="">Selecione um aluno</option>
            {alunos.map((aluno) => (
              <option key={aluno.id} value={aluno.id}>
                {aluno.nome}
              </option>
            ))}
          </select>

          <label>Curso</label>
          <select
            name="cursoId"
            value={newMatricula.cursoId}
            onChange={handleInputChange}
          >
            <option value="">Selecione um curso</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.nome}
              </option>
            ))}
          </select>
          <label>Status</label>
          <select
            name="status"
            value={newMatricula.status}
            onChange={handleInputChange}
          >
            <option value="1">Ativa</option>
            <option value="2">Trancada</option>
            <option value="3">Cancelada</option>
          </select>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarMatricula;
