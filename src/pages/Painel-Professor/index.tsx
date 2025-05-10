import React from "react";
import CardLink from "../../components/Card";
import "./styles.scss";
import UserInfo from "../../components/UserInfo";

const PainelProfessor: React.FC = () => {
  return (
    <div className="home-container">
      <div className="user-info-container">
        <UserInfo />
      </div>
      <h2>Bem-vindo ao Painel do Professor</h2>
      <p>Escolha uma opção abaixo:</p>

      <div className="card-container">
        <CardLink
          title="Lançar Notas"
          icon="📝"
          description="Registre e edite as notas dos seus alunos."
          to="/professor/notas"
        />
        <CardLink
          title="Minhas Turmas"
          icon="👥"
          description="Veja as turmas que você está lecionando e os alunos matriculados."
          to="/professor/turmas"
        />
        <CardLink
          title="Materiais"
          icon="📂"
          description="Gerencie e disponibilize materiais de apoio para os alunos."
          to="/professor/materiais"
        />
        <CardLink
          title="Meus Cursos"
          icon="📚"
          description="Consulte os cursos em que você está atuando como professor."
          to="/professor/cursos"
        />
      </div>
    </div>
  );
};

export default PainelProfessor;
