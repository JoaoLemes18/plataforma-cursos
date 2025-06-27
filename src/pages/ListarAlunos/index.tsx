import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Tabela from "../../components/Tabela";
import PessoaService, { Pessoa } from "../../services/PessoaService";
import ModalEditar from "../../components/EditarModal"; // importa o modal

import "./styles.scss";

const ListarAlunos: React.FC = () => {
  const [alunos, setAlunos] = useState<Pessoa[]>([]);
  const [pessoaEditando, setPessoaEditando] = useState<Pessoa | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const alunosData = await PessoaService.getAlunos();
        setAlunos(alunosData);
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
      }
    }
    fetchData();
  }, []);

  const colunas = [
    { title: "Nome", field: "nome" },
    { title: "Email", field: "email" },
    { title: "Telefone", field: "telefone" },
  ];

  const handleEdit = (aluno: Pessoa) => {
    console.log("Editar aluno:", aluno);
    setPessoaEditando(aluno); // abre modal com dados do aluno selecionado
  };

  const handleCloseModal = () => {
    setPessoaEditando(null);
  };

  const handleSavePessoa = async (dadosAtualizados: Pessoa) => {
    try {
      await PessoaService.editar(dadosAtualizados.id, dadosAtualizados);
      setAlunos((prev) =>
        prev.map((p) => (p.id === dadosAtualizados.id ? dadosAtualizados : p))
      );
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  return (
    <div className="page-listar-alunos">
      <div className="header">
        <Link to="/painel-coordenador" className="back-button">
          <FaArrowLeft />
        </Link>
      </div>

      <h2>Lista de Alunos</h2>

      <div className="content">
        <Tabela colunas={colunas} dados={alunos} onEdit={handleEdit} />
      </div>

      {/* Modal de edição */}
      {pessoaEditando && (
        <ModalEditar
          pessoa={pessoaEditando}
          onClose={handleCloseModal}
          onSave={handleSavePessoa}
        />
      )}
    </div>
  );
};

export default ListarAlunos;
