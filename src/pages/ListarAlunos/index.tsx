import { useEffect, useState } from "react";
import PessoaService, { Pessoa } from "../../services/PessoaService"; 
import { Link } from "react-router-dom";
import Tabela from "../../components/Tabela";
import { FaArrowLeft } from "react-icons/fa";

import "./styles.scss";

const ListarAlunos: React.FC = () => {
  const [alunos, setAlunos] = useState<Pessoa[]>([]);

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

  return (
    <div className="page-listar-alunos">
      <div className="header">
        <Link
          to="/painel-coordenador
        "
          className="back-button"
        >
          <FaArrowLeft />
        </Link>
      </div>

      <h2>Lista de Alunos</h2>

      <div className="content">
        <Tabela colunas={colunas} dados={alunos} />
      </div>
    </div>
  );
};

export default ListarAlunos;
