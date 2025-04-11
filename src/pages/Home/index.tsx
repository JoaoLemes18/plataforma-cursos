import React from "react";
import CardLink from "../../components/Card";
import "./styles.scss";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h2>Bem-vindo à Gestão Acadêmica</h2>
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
          title="Matrículas"
          icon="📝"
          description="Acompanhe as matrículas dos alunos e gerencie os status."
          to="/matricula"
        />
      </div>
    </div>
  );
};
export default Home;
