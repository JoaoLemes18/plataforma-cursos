import { useEffect, useState } from "react";
import CursoService, { Curso } from "../../services/CursoService"; // Importando CursoService
import { Link } from "react-router-dom";
import Tabela from "../../components/Tabela";
import { FaArrowLeft } from "react-icons/fa";

import "./styles.scss";

const ListarCursos: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cursosData = await CursoService.getAll(); // Usando o método getAll do CursoService
        setCursos(cursosData);
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      }
    }
    fetchData();
  }, []);

  const colunas = [
    { title: "Nome do Curso", field: "nome" },
    { title: "Duração", field: "duracaoEmHoras" },
    { title: "Descrição", field: "descricao" },
  ];

  return (
    <div className="page-listar-cursos">
      <div className="header">
        <Link to="/cursos" className="back-button">
          <FaArrowLeft />
        </Link>
      </div>

      <h2>Lista de Cursos</h2>

      <div className="content">
        <Tabela colunas={colunas} dados={cursos} />
      </div>
    </div>
  );
};

export default ListarCursos;
