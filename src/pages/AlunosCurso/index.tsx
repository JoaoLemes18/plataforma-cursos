import { useEffect, useState } from "react";
import { getMatriculas, Matricula } from "../../services/MatriculaService";
import AlunoService from "../../services/AlunoService";
import CursoService from "../../services/CursoService";
import { Link } from "react-router-dom";
import Tabela from "../../components/Tabela";
import { FaArrowLeft } from "react-icons/fa";
import "./style.scss";

const ListarMatriculas: React.FC = () => {
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [alunos, setAlunos] = useState<Record<number, string>>({});
  const [cursos, setCursos] = useState<string[]>([]); 
  const [filtroCurso, setFiltroCurso] = useState<string>("");
  const [filtroStatus, setFiltroStatus] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matriculasData, alunosData, cursosData] = await Promise.all([
          getMatriculas(),
          AlunoService.getAll(),
          CursoService.getAll(),
        ]);

        setMatriculas(matriculasData);
        setAlunos(
          alunosData.reduce(
            (map, aluno) => ({ ...map, [aluno.id]: aluno.nome }),
            {}
          )
        );
        setCursos(cursosData.map((curso) => curso.nome)); // Agora armazenamos nomes
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusTexto = (status: number): string => {
    return status === 1 ? "Ativa" : status === 2 ? "Trancada" : "Cancelada";
  };

  const matriculasFiltradas = matriculas.filter((matricula) => {
    const cursoMatch = filtroCurso === "" || matricula.curso === filtroCurso;
    const statusMatch =
      filtroStatus === "" || matricula.status === Number(filtroStatus);
    return cursoMatch && statusMatch;
  });

  const matriculasComNomes = matriculasFiltradas.map((matricula) => ({
    ...matricula,
    alunoNome: matricula.aluno || "Desconhecido",
    cursoNome: matricula.curso || "Desconhecido",
    statusTexto: getStatusTexto(matricula.status),
    statusClasse:
      matricula.status === 1
        ? "status-ativa"
        : matricula.status === 2
        ? "status-trancada"
        : "status-cancelada",
  }));

  return (
    <div className="page-listar-matriculas">
      <div className="header">
        <Link to="/matricula" className="back-button">
          <FaArrowLeft />
        </Link>
      </div>

      <h2>Lista de Matrículas</h2>

      {/* Filtros */}
      <div className="filtros">
        <select
          value={filtroCurso}
          onChange={(e) => setFiltroCurso(e.target.value)}
        >
          <option value="">Todos os Cursos</option>
          {cursos.map((curso, index) => (
            <option key={index} value={curso}>
              {curso}
            </option>
          ))}
        </select>

        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
        >
          <option value="">Filtrar por Status</option>
          <option value="1">Ativa</option>
          <option value="2">Trancada</option>
          <option value="3">Cancelada</option>
        </select>
      </div>

      <div className="content">
        <Tabela
          colunas={[
            { title: "ID", field: "id" },
            { title: "Aluno", field: "aluno" },
            { title: "Curso", field: "curso" },
            {
              title: "Status",
              field: "statusTexto",
              render: (row) => (
                <span className={`status-badge ${row.statusClasse}`}>
                  {row.statusTexto}
                </span>
              ),
            },
          ]}
          dados={matriculasComNomes}
        />
      </div>
    </div>
  );
};

export default ListarMatriculas;
