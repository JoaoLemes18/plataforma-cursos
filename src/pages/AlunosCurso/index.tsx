import { useEffect, useState } from "react";
import MatriculaService from "../../services/MatriculaService";
import { Link } from "react-router-dom";
import Tabela from "../../components/Tabela";
import { FaArrowLeft } from "react-icons/fa";
import "./style.scss";

// Declare o tipo Matricula aqui (ajuste conforme necessário)
interface Matricula {
  id: number;
  alunoNome?: string;
  cursoNomeDaTurma?: string;
  status: number;
}

const ListarMatriculas: React.FC = () => {
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [filtroCurso, setFiltroCurso] = useState<string>("");
  const [filtroStatus, setFiltroStatus] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chame o método correto dentro do serviço
        const matriculasData = await MatriculaService.getAll();
        setMatriculas(matriculasData);
      } catch (error) {
        console.error("Erro ao carregar matrículas:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusTexto = (status: number): string => {
    return status === 1 ? "Ativa" : status === 2 ? "Trancada" : "Cancelada";
  };

  // Extrair lista de cursos únicos para o filtro
  const cursosUnicos = Array.from(
    new Set(matriculas.map((m) => m.cursoNomeDaTurma))
  ).filter(Boolean);

  // Filtrar matrículas conforme filtros
  const matriculasFiltradas = matriculas.filter((matricula) => {
    const cursoMatch =
      filtroCurso === "" || matricula.cursoNomeDaTurma === filtroCurso;
    const statusMatch =
      filtroStatus === "" || matricula.status === Number(filtroStatus);
    return cursoMatch && statusMatch;
  });

  // Mapear para adicionar textos e classes de status para a tabela
  const matriculasComNomes = matriculasFiltradas.map((matricula) => ({
    ...matricula,
    aluno: matricula.alunoNome || "Desconhecido",
    curso: matricula.cursoNomeDaTurma || "Desconhecido",
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
        <Link to="/painel-coordenador" className="back-button">
          <FaArrowLeft />
        </Link>
      </div>

      <h2>Alunos por curso</h2>

      {/* Filtros */}
      <div className="filtros">
        <select
          value={filtroCurso}
          onChange={(e) => setFiltroCurso(e.target.value)}
        >
          <option value="">Todos os Cursos</option>
          {cursosUnicos.map((curso) => (
            <option key={curso} value={curso}>
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
