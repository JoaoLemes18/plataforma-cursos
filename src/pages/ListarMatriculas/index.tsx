import { useEffect, useState } from "react";
import MatriculaService from "../../services/MatriculaService";
import type { Matricula } from "../../types"; // ajustar conforme seu arquivo de tipos
import { Link } from "react-router-dom";
import Tabela from "../../components/Tabela";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import Modal from "../../components/Modal";
import "./style.scss";

interface MatriculaComNomes extends Matricula {
  alunoNome: string;
  turmaNome: string;
  cursoNomeDaTurma: string;
}

const ListarMatriculas: React.FC = () => {
  const [matriculas, setMatriculas] = useState<MatriculaComNomes[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [matriculaSelecionada, setMatriculaSelecionada] =
    useState<MatriculaComNomes | null>(null);
  const [novoStatus, setNovoStatus] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matriculasData = await MatriculaService.getAll();
        setMatriculas(matriculasData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusTexto = (status: number): string => {
    return status === 1 ? "Ativa" : status === 2 ? "Trancada" : "Cancelada";
  };

  const abrirModalEdicao = (matricula: MatriculaComNomes) => {
    setMatriculaSelecionada(matricula);
    setNovoStatus(matricula.status);
    setModalAberto(true);
  };

  const salvarEdicao = async () => {
    if (!matriculaSelecionada) return;

    try {
      await MatriculaService.editarStatus(matriculaSelecionada.id, novoStatus);
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
            { title: "Aluno", field: "alunoNome" },
            { title: "Turma", field: "turmaNome" },
            { title: "Curso", field: "cursoNomeDaTurma" },
            {
              title: "Status",
              field: "status",
              render: (row) => (
                <span
                  className={`status-badge ${
                    row.status === 1
                      ? "status-ativa"
                      : row.status === 2
                      ? "status-trancada"
                      : "status-cancelada"
                  }`}
                >
                  {getStatusTexto(row.status)}
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
          dados={matriculas}
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
