import { useState, useEffect } from "react";
import createMatricula from "../../services/MatriculaService";
import PessoaService from "../../services/PessoaService";
import TurmaService from "../../services/TurmaService";
import CursoService from "../../services/CursoService"; // IMPORTAÇÃO NOVA
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./style.scss";

interface Pessoa {
  id: number;
  nome: string;
}

interface Curso {
  id: number;
  nome: string;
}

interface Turma {
  id: number;
  nome: string;
  cursoId: number;
  cursoNome?: string; // vai preencher depois
}

interface NovaMatriculaState {
  pessoaId: string; // mudou de alunoId para pessoaId
  turmaId: string;
  status: number;
}

const CadastrarMatricula: React.FC = () => {
  const [newMatricula, setNewMatricula] = useState<NovaMatriculaState>({
    pessoaId: "",
    turmaId: "",
    status: 1,
  });

  const [alunos, setAlunos] = useState<Pessoa[]>([]);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]); // estado para cursos

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alunosData = await PessoaService.getAlunos();
        const turmasData = await TurmaService.getAll();
        const cursosData = await CursoService.getAll();

        // associar cursoNome em cada turma
        const turmasComCursoNome = turmasData.map((turma) => {
          const curso = cursosData.find((c) => c.id === turma.cursoId);
          return {
            ...turma,
            cursoNome: curso ? curso.nome : "",
          };
        });

        setAlunos(alunosData);
        setCursos(cursosData);
        setTurmas(turmasComCursoNome);
      } catch (error) {
        console.error("Erro ao carregar alunos, turmas e cursos:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMatricula((prev) => ({
      ...prev,
      [name]: name === "status" ? Number(value) : value,
    }));
  };

  const handleAddMatricula = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newMatricula.pessoaId === "" || newMatricula.turmaId === "") {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    try {
      await createMatricula.cadastrar({
        pessoaId: Number(newMatricula.pessoaId),
        turmaId: Number(newMatricula.turmaId),
        status: newMatricula.status,
      });

      alert("Matrícula realizada com sucesso!");
      setNewMatricula({ pessoaId: "", turmaId: "", status: 1 });
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
          <label htmlFor="pessoaId">Aluno</label>
          <select
            id="pessoaId"
            name="pessoaId"
            value={newMatricula.pessoaId}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione um aluno</option>
            {alunos.map((aluno) => (
              <option key={aluno.id} value={aluno.id}>
                {aluno.nome}
              </option>
            ))}
          </select>

          <label htmlFor="turmaId">Turma</label>
          <select
            id="turmaId"
            name="turmaId"
            value={newMatricula.turmaId}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione uma turma</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.cursoNome} - {turma.nome}
              </option>
            ))}
          </select>

          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={newMatricula.status}
            onChange={handleInputChange}
            required
          >
            <option value={1}>Ativa</option>
            <option value={2}>Trancada</option>
            <option value={3}>Cancelada</option>
          </select>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarMatricula;
