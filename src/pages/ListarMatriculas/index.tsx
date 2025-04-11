import { useEffect, useState } from "react";
import { getMatriculas, Matricula } from "../../services/MatriculaService";
import AlunoService from "../../services/AlunoService";
import CursoService from "../../services/CursoService";
import { Link } from "react-router-dom";
import Tabela from "../../components/Tabela";
import { FaArrowLeft } from "react-icons/fa";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import "./style.scss";

// Função para formatar a data no fuso de Cuiabá
const formatarData = (dataISO: string) => {
  const data = new TZDate(dataISO, "America/Cuiaba");
  return format(data, "dd/MM/yyyy HH:mm");
};

const ListarMatriculas: React.FC = () => {
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [alunos, setAlunos] = useState<Record<number, string>>({});
  const [cursos, setCursos] = useState<Record<number, string>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const matriculasData = await getMatriculas();
        const alunosData = await AlunoService.getAll();
        const cursosData = await CursoService.getAll();

        setMatriculas(matriculasData);
        setAlunos(
          alunosData.reduce((map, aluno) => {
            map[aluno.id] = aluno.nome;
            return map;
          }, {} as Record<number, string>)
        );
        setCursos(
          cursosData.reduce((map, curso) => {
            map[curso.id] = curso.nome;
            return map;
          }, {} as Record<number, string>)
        );
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    fetchData();
  }, []);

  const getStatusTexto = (status: number): string => {
    switch (status) {
      case 1:
        return "Ativa";
      case 2:
        return "Trancada";
      case 3:
        return "Cancelada";
      default:
        return "Desconhecido";
    }
  };

  const matriculasComNomes = matriculas.map((matricula) => ({
    ...matricula,
    alunoNome: alunos[matricula.alunoId] || "Desconhecido",
    cursoNome: cursos[matricula.cursoId] || "Desconhecido",
    statusTexto: getStatusTexto(matricula.status),
    dataMatriculaFormatada: formatarData(matricula.dataMatricula),
  }));

  const colunas = [
    { title: "Número da Matrícula", field: "id" },
    { title: "Aluno", field: "aluno" },
    { title: "Curso", field: "curso" },
    { title: "Status", field: "statusTexto" },
    { title: "Data de Matrícula", field: "dataMatriculaFormatada" },
  ];

  return (
    <div className="page-listar-matriculas">
      <div className="header">
        <Link to="/matricula" className="back-button">
          <FaArrowLeft />
        </Link>
      </div>

      <h2>Lista de Matrículas</h2>

      <div className="content">
        <Tabela colunas={colunas} dados={matriculasComNomes} />
      </div>
    </div>
  );
};

export default ListarMatriculas;
