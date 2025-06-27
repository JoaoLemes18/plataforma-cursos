import { useState, useEffect } from "react";
import createMatricula from "../../services/MatriculaService";
import PessoaService from "../../services/PessoaService";
import TurmaService from "../../services/TurmaService";
import MatriculaService from "../../services/MatriculaService";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./style.scss";

interface Pessoa {
  id: number;
  nome: string;
}

interface Turma {
  id: number;
  nome: string;
  cursoId: number;
  capacidade: number;
  matriculados: number;
  cursoNome?: string;
}

interface NovaMatriculaState {
  pessoaId: string;
  turmaId: string;
  status: number;
}

interface Matricula {
  id: number;
  status: number;
  dataMatricula: string;
  turmaId: number;
  turmaNome: string;
  cursoId: number;
  cursoNome: string;
}

const CadastrarMatricula: React.FC = () => {
  const [newMatricula, setNewMatricula] = useState<NovaMatriculaState>({
    pessoaId: "",
    turmaId: "",
    status: 1,
  });

  const [alunos, setAlunos] = useState<Pessoa[]>([]);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [matriculasAluno, setMatriculasAluno] = useState<Matricula[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alunosData = await PessoaService.getAlunos();
        const turmasData = await TurmaService.getAll();

        const turmasComCursoNome = turmasData.map((turma) => ({
          ...turma,
          matriculados: turma.matriculados ?? 0,
        }));

        setAlunos(alunosData);
        setTurmas(turmasComCursoNome);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchMatriculasAluno = async () => {
      if (!newMatricula.pessoaId) {
        setMatriculasAluno([]);
        return;
      }

      try {
        const data = await MatriculaService.getByAlunoId(
          Number(newMatricula.pessoaId)
        );
        setMatriculasAluno(data);
      } catch (error) {
        console.error("Erro ao carregar matrículas do aluno:", error);
        setMatriculasAluno([]);
      }
    };

    fetchMatriculasAluno();
  }, [newMatricula.pessoaId]);

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

    const turmaSelecionada = turmas.find(
      (t) => t.id === Number(newMatricula.turmaId)
    );

    const cursosJaMatriculados = matriculasAluno.map((m) => m.cursoId);
    const turmasJaMatriculadasIds = matriculasAluno.map((m) => m.turmaId);

    // 🔒 Impede matrícula duplicada no mesmo curso
    if (
      turmaSelecionada &&
      cursosJaMatriculados.includes(turmaSelecionada.cursoId)
    ) {
      alert("O aluno já está matriculado neste curso.");
      return;
    }

    // 🔒 Impede matrícula duplicada na mesma turma
    if (
      turmaSelecionada &&
      turmasJaMatriculadasIds.includes(turmaSelecionada.id)
    ) {
      alert("O aluno já está matriculado nesta turma.");
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
      setMatriculasAluno([]);
    } catch (error) {
      console.error("Erro ao cadastrar matrícula:", error);
      alert("Erro ao cadastrar matrícula. Tente novamente.");
    }
  };

  const getVagasDisponiveis = (turma: Turma) => {
    const vagas = turma.capacidade - turma.matriculados;
    return vagas >= 0 ? vagas : 0;
  };

  const turmasJaMatriculadasIds = matriculasAluno.map((m) => m.turmaId);

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

          {matriculasAluno.length > 0 && (
            <div className="turmas-matriculadas">
              <p>Turmas já matriculadas:</p>
              <ul>
                {matriculasAluno.map((m) => (
                  <li key={m.id}>{m.turmaNome}</li>
                ))}
              </ul>
            </div>
          )}

          <label htmlFor="turmaId">Turma</label>
          <select
            id="turmaId"
            name="turmaId"
            value={newMatricula.turmaId}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione uma turma</option>
            {turmas.map((turma) => {
              const vagas = getVagasDisponiveis(turma);
              const jaMatriculadoNaTurma = turmasJaMatriculadasIds.includes(
                turma.id
              );

              return (
                <option
                  key={turma.id}
                  value={turma.id}
                  disabled={vagas === 0 || jaMatriculadoNaTurma}
                >
                  {turma.cursoNome} - {turma.nome} | Vagas: {vagas}
                  {vagas === 0
                    ? " (sem vagas)"
                    : jaMatriculadoNaTurma
                    ? " (já matriculado)"
                    : ""}
                </option>
              );
            })}
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
