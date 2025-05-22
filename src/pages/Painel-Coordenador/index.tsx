import React from "react";
import CardLink from "../../components/Card";
import "./styles.scss";
import UserInfo from "../../components/UserInfo";

const PainelCoordenador: React.FC = () => {
  return (
    <div className="home-container">
      <div className="user-info-container">
        <UserInfo />
      </div>
      <h2>Bem-vindo ao Painel do Coordenador</h2>
      <p>Escolha uma opção abaixo:</p>

      <div className="card-container">
        <CardLink
          title="Ver Alunos"
          icon="👨‍🎓"
          description="Visualize, edite e organize os dados dos alunos cadastrados."
          to="/listar-alunos"
        />
        <CardLink
          title="Ver Professores"
          icon="🧑‍🏫"
          description="Visualize, edite e organize os dados dos professores cadastrados."
          to="/listar-professores"
        />
        <CardLink
          title="Cursos"
          icon="📚"
          description="Crie, edite e gerencie os cursos oferecidos pela instituição."
          to="/cursos"
        />
        <CardLink
          title="Comunicados"
          icon="📢"
          description="Crie e gerencie comunicados que aparecerão para os usuários."
          to="/comunicado"
        />
        <CardLink
          title="Turma"
          icon="👥"
          description="Crie, edite e gerencia as turmas que vão ser criadas."
          to="/turmas"
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
