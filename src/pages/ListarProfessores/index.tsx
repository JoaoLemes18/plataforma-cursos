import { useEffect, useState } from "react";
import { getProfessores, Professor } from "../../services/ProfessorService";
import { getCursos, Curso } from "../../services/CursoService"; // Importando a função para buscar cursos
import { Link } from "react-router-dom";
import Tabela from "../../components/Tabela";
import { FaArrowLeft } from "react-icons/fa";

import "./styles.scss";

const ListarProfessores: React.FC = () => {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]); // Estado para armazenar os cursos

  // Buscando dados de professores e cursos ao carregar o componente
  useEffect(() => {
    async function fetchData() {
      try {
        const professoresData = await getProfessores();
        const cursosData = await getCursos(); // Buscando cursos
        setProfessores(professoresData);
        setCursos(cursosData); // Atualizando o estado dos cursos
      } catch (error) {
        console.error("Erro ao carregar professores e cursos:", error);
      }
    }
    fetchData();
  }, []);

  const colunas = [
    { title: "Nome", field: "nome" },
    { title: "Especialidade", field: "areaEspecializacao" },
    { title: "Email", field: "email" },
    { title: "Idade", field: "idade" },
  ];

  return (
    <div className="page-listar-professores">
      <div className="header">
        <Link to="/professores" className="back-button">
          <FaArrowLeft />
        </Link>
      </div>

      <h2>Lista de Professores</h2>

      <div className="content">
        <Tabela colunas={colunas} dados={professores} />
      </div>
    </div>
  );
};

export default ListarProfessores;
