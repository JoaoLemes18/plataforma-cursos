import { useEffect, useState } from "react";
import { getProfessores, Professor } from "../../services/ProfessorService";
import { getCursos, Curso } from "../../services/CursoService";
import { Link } from "react-router-dom";
import Tabela from "../../components/Tabela";
import { FaArrowLeft } from "react-icons/fa";

import "./styles.scss";

const ListarProfessores: React.FC = () => {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const professoresData = await getProfessores();
        const cursosData = await getCursos();
        setProfessores(professoresData);
        setCursos(cursosData);
      } catch (error) {
        console.error("Erro ao carregar professores e cursos:", error);
      }
    }
    fetchData();
  }, []);

  // Criar um mapa de cursos para facilitar a busca pelo nome
  const cursoMap = cursos.reduce((map, curso) => {
    map[curso.id] = `${curso.id} - ${curso.nome}`; // Exibe ID + Nome do curso
    return map;
  }, {} as Record<number, string>);

  // Atualizar os professores para incluir o nome do curso ao invés do ID
  const professoresComCurso = professores.map((prof) => ({
    ...prof,
    cursoNome: cursoMap[prof.cursoId] || "Não informado",
  }));

  const colunas = [
    { title: "Nome", field: "nome" },
    { title: "Especialidade", field: "areaEspecializacao" },
    { title: "Email", field: "email" },
    { title: "Idade", field: "idade" },
    { title: "Curso", field: "cursoNome" }, // Agora exibe corretamente "ID - Nome do Curso"
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
        <Tabela colunas={colunas} dados={professoresComCurso} />
      </div>
    </div>
  );
};

export default ListarProfessores;
