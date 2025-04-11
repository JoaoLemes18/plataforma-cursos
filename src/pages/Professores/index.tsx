import { useState, useEffect } from "react";
import { createProfessor, Professor } from "../../services/ProfessorService";
import CursoService from "../../services/CursoService"; // Certifique-se que a importação está correta
import { Link } from "react-router-dom";
import "./styles.scss";
import { FaArrowLeft } from "react-icons/fa"; // Ícone de seta para voltar

// Definição do tipo Curso
interface Curso {
  id: number;
  nome: string;
}

const CadastrarProfessor: React.FC = () => {
  const [newProfessor, setNewProfessor] = useState<
    Omit<Professor, "id"> & { cursoId: number | null }
  >({
    nome: "",
    email: "",
    idade: 0,
    areaEspecializacao: "",
    cursoId: null, // Inicializa como null para evitar problemas
  });

  const [cursos, setCursos] = useState<Curso[]>([]); // Estado para armazenar os cursos

  // Buscar cursos ao carregar a página
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const cursosData = await CursoService.getAll(); // Chama o método correto
        setCursos(cursosData);
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      }
    };

    fetchCursos();
  }, []);

  // Atualiza os inputs do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProfessor({ ...newProfessor, [e.target.name]: e.target.value });
  };

  // Atualiza o curso selecionado
  const handleCursoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCursoId = e.target.value ? Number(e.target.value) : null;
    setNewProfessor({ ...newProfessor, cursoId: selectedCursoId });
  };

  // Cadastrar novo professor na API
  const handleAddProfessor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newProfessor.nome ||
      !newProfessor.email ||
      !newProfessor.idade ||
      !newProfessor.areaEspecializacao ||
      newProfessor.cursoId === null
    ) {
      alert("Preencha todos os campos corretamente e selecione um curso!");
      return;
    }

    try {
      await createProfessor(newProfessor);
      alert("Professor cadastrado com sucesso!");
      setNewProfessor({
        nome: "",
        email: "",
        idade: 0,
        areaEspecializacao: "",
        cursoId: null,
      });
    } catch (error) {
      console.error("Erro ao adicionar professor:", error);
      alert(
        "Erro ao cadastrar professor. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <div className="page-cadastrar-professor">
      {/* Header com botão de voltar e botão de ver professores */}
      <div className="header">
        <Link to="/" className="back-button">
          <FaArrowLeft />
        </Link>

        <Link to="/listar-professores" className="view-button">
          Ver Professores
        </Link>
      </div>

      <h2>Cadastrar Novo Professor</h2>

      <div className="form-container">
        <form onSubmit={handleAddProfessor}>
          <label>Nome do Professor</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o nome"
            value={newProfessor.nome}
            onChange={handleInputChange}
          />

          <label>Email do Professor</label>
          <input
            type="email"
            name="email"
            placeholder="Digite o email"
            value={newProfessor.email}
            onChange={handleInputChange}
          />

          <label>Idade do Professor</label>
          <input
            type="number"
            name="idade"
            placeholder="Digite a idade"
            value={newProfessor.idade}
            onChange={handleInputChange}
          />

          <label>Área de Especialização</label>
          <input
            type="text"
            name="areaEspecializacao"
            placeholder="Digite a especialização"
            value={newProfessor.areaEspecializacao}
            onChange={handleInputChange}
          />

          <label>Curso que vai administrar as aulas</label>
          <select
            name="cursoId"
            value={newProfessor.cursoId ?? ""}
            onChange={handleCursoChange}
          >
            <option value="">Selecione um curso</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.nome}
              </option>
            ))}
          </select>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarProfessor;
