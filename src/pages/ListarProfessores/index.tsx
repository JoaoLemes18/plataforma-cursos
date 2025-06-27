import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Tabela from "../../components/Tabela";
import PessoaService, { Pessoa } from "../../services/PessoaService";
import ModalEditar from "../../components/EditarModal"; // importa o modal

import "./styles.scss";

const ListarProfessores: React.FC = () => {
  const [professores, setProfessores] = useState<Pessoa[]>([]);
  const [pessoaEditando, setPessoaEditando] = useState<Pessoa | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const professoresData = await PessoaService.getProfessores();
        setProfessores(professoresData);
      } catch (error) {
        console.error("Erro ao carregar professores:", error);
      }
    }
    fetchData();
  }, []);

  const colunas = [
    { title: "Nome", field: "nome" },
    { title: "Email", field: "email" },
    { title: "Telefone", field: "telefone" },
  ];

  const handleEdit = (professor: Pessoa) => {
    console.log("Editar professor:", professor);
    setPessoaEditando(professor); // abre modal com dados do professor selecionado
  };

  const handleCloseModal = () => {
    setPessoaEditando(null);
  };

  const handleSavePessoa = async (dadosAtualizados: Pessoa) => {
    try {
      await PessoaService.editar(dadosAtualizados.id, dadosAtualizados);
      setProfessores((prev) =>
        prev.map((p) => (p.id === dadosAtualizados.id ? dadosAtualizados : p))
      );
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  return (
    <div className="page-listar-professores">
      <div className="header">
        <Link to="/painel-coordenador" className="back-button" title="Voltar">
          <FaArrowLeft />
        </Link>
      </div>

      <h2>Lista de Professores</h2>

      <div className="content">
        <Tabela colunas={colunas} dados={professores} onEdit={handleEdit} />
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

export default ListarProfessores;
