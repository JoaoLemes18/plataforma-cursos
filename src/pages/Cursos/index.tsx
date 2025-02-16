import React, { useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../../components/CardInfo"; // Importa o novo componente de card
import "./styles.scss";

interface Course {
  id: number;
  nome: string;
  descricao: string;
  duracaoEmHoras: number;
  professores: Professor[]; // Adicionando a lista de professores no curso
}

interface Professor {
  id: number;
  nome: string;
  especialidade: string;
}

// Dados mockados para os cursos
const mockCourses: Course[] = [
  {
    id: 1,
    nome: "React Básico",
    descricao: "Aprenda os fundamentos do React.",
    duracaoEmHoras: 10,
    professores: [],
  },
  {
    id: 2,
    nome: "Node.js para Iniciantes",
    descricao: "Introdução ao desenvolvimento backend com Node.js.",
    duracaoEmHoras: 12,
    professores: [],
  },
  {
    id: 3,
    nome: "UI/UX Design",
    descricao: "Princípios de design para interfaces amigáveis.",
    duracaoEmHoras: 8,
    professores: [],
  },
];

// Dados mockados para os professores cadastrados
const mockProfessors: Professor[] = [
  { id: 1, nome: "João Silva", especialidade: "Frontend" },
  { id: 2, nome: "Maria Oliveira", especialidade: "Backend" },
  { id: 3, nome: "Carlos Souza", especialidade: "Design" },
];

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses); // Mock inicial
  const [professors, setProfessors] = useState<Professor[]>(mockProfessors); // Lista de professores já cadastrados
  const [newCourse, setNewCourse] = useState<Course>({
    id: 0,
    nome: "",
    descricao: "",
    duracaoEmHoras: 0,
    professores: [],
  });
  const [selectedProfessor, setSelectedProfessor] = useState<number | null>(
    null
  ); // ID do professor selecionado

  // Função de entrada de dados do novo curso
  const handleCourseInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  // Função para selecionar o professor
  const handleProfessorSelection = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProfessor(parseInt(e.target.value)); // Atualiza o ID do professor selecionado
  };

  // Função de adicionar novo curso
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newCourse.nome ||
      !newCourse.descricao ||
      newCourse.duracaoEmHoras <= 0 ||
      selectedProfessor === null
    ) {
      alert("Preencha todos os campos corretamente e selecione um professor!");
      return;
    }

    const professorToAdd = professors.find(
      (professor) => professor.id === selectedProfessor
    );

    const updatedCourses = [
      ...courses,
      {
        ...newCourse,
        id: courses.length + 1, // Novo ID incremental
        professores: professorToAdd ? [professorToAdd] : [], // Adiciona o professor selecionado
      },
    ];

    setCourses(updatedCourses); // Atualiza a lista de cursos
    setNewCourse({
      id: 0,
      nome: "",
      descricao: "",
      duracaoEmHoras: 0,
      professores: [],
    }); // Limpa o formulário de curso
    setSelectedProfessor(null); // Limpa a seleção de professor
  };

  return (
    <div className="courses-container">
      <h2>Gerenciamento de Cursos</h2>

      {/* Formulário de Cadastro de Curso */}
      <div className="form-container">
        <h3>Cadastrar Novo Curso</h3>
        <form onSubmit={handleAddCourse}>
          <input
            type="text"
            name="nome"
            placeholder="Nome do Curso"
            value={newCourse.nome}
            onChange={handleCourseInputChange}
          />
          <textarea
            name="descricao"
            placeholder="Descrição"
            value={newCourse.descricao}
            onChange={handleCourseInputChange}
          ></textarea>
          <input
            type="number"
            name="duracaoEmHoras"
            placeholder="Duração (horas)"
            value={newCourse.duracaoEmHoras}
            onChange={handleCourseInputChange}
          />

          {/* Seção de Seleção de Professor */}
          <h4>Selecione o Professor</h4>
          <select
            value={selectedProfessor || ""}
            onChange={handleProfessorSelection}
          >
            <option value="" disabled>
              Selecione um Professor
            </option>
            {professors.map((professor) => (
              <option key={professor.id} value={professor.id}>
                {professor.nome} - {professor.especialidade}
              </option>
            ))}
          </select>

          <button type="submit">Adicionar Curso</button>
        </form>
      </div>

      {/* Listagem de cursos */}
      <div className="courses-list">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <CourseCard course={course} />
            <div className="professors-section">
              <h4>Professores</h4>
              <ul>
                {course.professores.map((professor) => (
                  <li key={professor.id}>
                    {professor.nome} - {professor.especialidade}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <Link to="/" className="back-button">
        Voltar para Home
      </Link>
    </div>
  );
};

export default Courses;
