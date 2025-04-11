import { useEffect, useState } from "react";
import {
  getMatriculas,
  updateMatriculaStatus,
  Matricula,
} from "../../services/MatriculaService";
import AlunoService from "../../services/AlunoService";
import CursoService from "../../services/CursoService";
import { Link } from "react-router-dom";
import Tabela from "../../components/Tabela";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import Modal from "../../components/Modal";
import "./style.scss";

const ListarMatriculas: React.FC = () => {
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [alunos, setAlunos] = useState<Record<number, string>>({});
  const [cursos, setCursos] = useState<Record<number, string>>({});
  const [modalAberto, setModalAberto] = useState(false);
  const [matriculaSelecionada, setMatriculaSelecionada] =
    useState<Matricula | null>(null);
  const [novoStatus, setNovoStatus] = useState<number>(1);

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
        setCursos(
          cursosData.reduce(
            (map, curso) => ({ ...map, [curso.id]: curso.nome }),
            {}
          )
        );
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusTexto = (status: number): string => {
    return status === 1 ? "Ativa" : status === 2 ? "Trancada" : "Cancelada";
  };

  const abrirModalEdicao = (matricula: Matricula) => {
    setMatriculaSelecionada(matricula);
    setNovoStatus(matricula.status);
    setModalAberto(true);
  };

  const salvarEdicao = async () => {
    if (!matriculaSelecionada) return;

    try {
      await updateMatriculaStatus(matriculaSelecionada.id, novoStatus);
      setMatriculas((prev) =>
        prev.map((mat) =>
          mat.id === matriculaSelecionada.id
            ? { ...mat, status: novoStatus }
            : mat
        )
      );
      setModalAberto(false);
    } catch (error) {
      console.error("Erro ao atualizar matrícula:", error);
    }
  };

  const matriculasComNomes = matriculas.map((matricula) => ({
    ...matricula,
    alunoNome: alunos[matricula.alunoId] || "Desconhecido",
    cursoNome: cursos[matricula.cursoId] || "Desconhecido",
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

      <div className="content">
        <Tabela
          colunas={[
            { title: "ID", field: "id" },
            { title: "Aluno", field: "aluno" },
            { title: "Curso", field: "curso" },
            {
              title: "Status",
              field: "status",
              render: (row) => (
                <span className={`status-badge ${row.statusClasse}`}>
                  {row.statusTexto}
                  <button
                    onClick={() => abrirModalEdicao(row)}
                    className="edit-button"
                  >
                    <FaEdit />
                  </button>
                </span>
              ),
            },
          ]}
          dados={matriculasComNomes}
        />
      </div>

      {modalAberto && (
        <Modal
          fechar={() => setModalAberto(false)}
          titulo="Editar Status da Matrícula"
        >
          <select
            value={novoStatus}
            onChange={(e) => setNovoStatus(Number(e.target.value))}
          >
            <option value={1}>Ativa</option>
            <option value={2}>Trancada</option>
            <option value={3}>Cancelada</option>
          </select>
          <button className="save-button" onClick={salvarEdicao}>
            Salvar
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ListarMatriculas;
