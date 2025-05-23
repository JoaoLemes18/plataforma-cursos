import { useEffect, useState } from "react";
import PessoaService from "../../services/PessoaService";
import CursoService from "../../services/CursoService";
import { Link } from "react-router-dom";
import Tabela from "../../components/Tabela";
import { FaArrowLeft } from "react-icons/fa";

import "./styles.scss";

interface Pessoa {
  id: number;
  nome: string;
  email: string;
  cursoId?: number;
}

interface Curso {
  id: number;
  nome: string;
}

const ListarProfessores: React.FC = () => {
  const [professores, setProfessores] = useState<Pessoa[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const professoresData = await PessoaService.getProfessores();
        const cursosData = await CursoService.getAll();

        setProfessores(professoresData);
        setCursos(cursosData);
      } catch (error) {
        console.error("Erro ao carregar professores e cursos:", error);
      }
    }
    fetchData();
  }, []);

  const cursoMap = cursos.reduce((map, curso) => {
    map[curso.id] = `${curso.id} - ${curso.nome}`;
    return map;
  }, {} as Record<number, string>);

  const professoresComCurso = professores.map((prof) => ({
    ...prof,
    cursoNome: prof.cursoId ? cursoMap[prof.cursoId] : "Não informado",
  }));

  const colunas = [
    { title: "Nome", field: "nome" },
    { title: "Email", field: "email" },
    { title: "Telefone", field: "telefone" },
  ];

  return (
    <div className="page-listar-professores">
      <div className="header">
        <Link to="/painel-coordenador" className="back-button" title="Voltar">
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
