import React from "react";
import CardLink from "../../components/Card";
import "./styles.scss";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h2>Bem-vindo à Plataforma de Cursos</h2>
      <p>Escolha uma opção abaixo:</p>

      <div className="card-container">
        <CardLink
          title="Alunos"
          icon="👨‍🎓"
          description="Visualize e gerencie os alunos."
          to="/alunos"
        />
        <CardLink
          title="Cursos"
          icon="📚"
          description="Gerencie os cursos disponíveis."
          to="/cursos"
        />
        <CardLink
          title="Professores"
          icon="👩‍🏫"
          description="Confira os professores cadastrados."
          to="/professores"
        />
      </div>
    </div>
  );
};
export default Home;
