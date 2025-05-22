import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import Tabela from "../../components/Tabela";
import Modal from "../../components/Modal";
import TurmaService, { Turma } from "../../services/TurmaService";
import CursoService from "../../services/CursoService";
import "./style.scss";

const ListarTurmas: React.FC = () => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [cursos, setCursos] = useState<Record<number, string>>({});
  const [modalAberto, setModalAberto] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);
  const [novoNome, setNovoNome] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [turmasData, cursosData] = await Promise.all([
          TurmaService.getAll(),
          CursoService.getAll(),
        ]);

        setTurmas(turmasData);
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

  const abrirModalEdicao = (turma: Turma) => {
    setTurmaSelecionada(turma);
    setNovoNome(turma.nome);
    setModalAberto(true);
  };

  const salvarEdicao = async () => {
    if (!turmaSelecionada) return;

    try {
      await TurmaService.updateNome(turmaSelecionada.id, novoNome);
      setTurmas((prev) =>
        prev.map((t) =>
          t.id === turmaSelecionada.id ? { ...t, nome: novoNome } : t
        )
      );
      setModalAberto(false);
    } catch (error) {
      console.error("Erro ao atualizar turma:", error);
    }
  };

  const turmasComNomes = turmas.map((turma) => ({
    ...turma,
    cursoNome: cursos[turma.cursoId] || "Desconhecido",
  }));

  return (
    <div className="page-listar-turmas">
      <div className="header">
        <Link to="/turma" className="back-button">
          <FaArrowLeft />
        </Link>
      </div>

      <h2>Lista de Turmas</h2>

      <div className="content">
        <Tabela
          colunas={[
            { title: "ID", field: "id" },
            { title: "Nome", field: "nome" },
            { title: "Curso", field: "cursoNome" },
            { title: "Ano Letivo", field: "anoLetivo" },
            { title: "Semestre", field: "semestre" },
            {
              title: "Ações",
              field: "acoes",
              render: (row) => (
                <button
                  onClick={() => abrirModalEdicao(row)}
                  className="edit-button"
                >
                  <FaEdit />
                </button>
              ),
            },
          ]}
          dados={turmasComNomes}
        />
      </div>

      {modalAberto && (
        <Modal
          fechar={() => setModalAberto(false)}
          titulo="Editar Nome da Turma"
        >
          <input
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
          />
          <button className="save-button" onClick={salvarEdicao}>
            Salvar
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ListarTurmas;
