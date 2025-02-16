import React from "react";
import "./styles.scss";

interface Course {
  id: number;
  nome: string;
  descricao: string;
  duracaoEmHoras: number;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="course-card">
      <h3>{course.nome}</h3>
      <p>{course.descricao}</p>
      <span className="duration">Duração: {course.duracaoEmHoras} horas</span>
    </div>
  );
};

export default CourseCard;
