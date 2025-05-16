import React from "react";
import CardLink from "../../components/Card";
import "./styles.scss";
import UserInfo from "../../components/UserInfo";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const PainelCoordenador: React.FC = () => {
  return (
    <div className="home-container">
      <Link to="/home" className="back-button">
        <FaArrowLeft />
      </Link>
      <div className="user-info-container">
        <UserInfo />
      </div>
      <h2>Bem-vindo ao Painel do Coordenador</h2>
      <p>Escolha uma opção abaixo:</p>

      <div className="card-container">
        <CardLink
          title="Alunos"
          icon="👨‍🎓"
          description="Visualize, edite e organize os dados dos alunos cadastrados."
          to="/alunos"
        />
        <CardLink
          title="Cursos"
          icon="📚"
          description="Crie, edite e gerencie os cursos oferecidos pela instituição."
          to="/cursos"
        />
        <CardLink
          title="Professores"
          icon="👩‍🏫"
          description="Veja os professores cadastrados e seus respectivos cursos."
          to="/professores"
        />
        <CardLink
          title="Matrícula"
          icon="📝"
          description="Acompanhe as matrículas dos alunos e gerencie os status."
          to="/matricula"
        />
        <CardLink
          title="Alunos por Curso"
          icon="📋"
          description="Veja quais alunos estão matriculados em quais cursos."
          to="/alunos-curso"
        />
      </div>
    </div>
  );
};

export default PainelCoordenador;
