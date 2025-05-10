import React from "react";
import CardLink from "../../components/Card";
import "./styles.scss";
import UserInfo from "../../components/UserInfo";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="user-info-container">
        <UserInfo />
      </div>
      <h2>Bem-vindo à Gestão Acadêmica</h2>
      <p>Escolha uma opção abaixo:</p>

      <div className="card-container">
        <CardLink
          title="Painel do Aluno"
          icon="🎓"
          description="Acesse as informações acadêmicas e desempenho do aluno."
          to="/painel-aluno"
        />
        <CardLink
          title="Painel do Professor"
          icon="🧑‍🏫"
          description="Acesse as turmas, notas lançadas e informações do professor."
          to="/painel-professor"
        />
        <CardLink
          title="Painel do Coordenador"
          icon="🗂️"
          description="Gerencie cursos, turmas, professores e desempenho geral."
          to="/painel-coordenador"
        />
        <CardLink
          title="Painel do Financeiro"
          icon="💰"
          description="Acompanhe dados financeiros, mensalidades e cobranças."
          to="/painel-financeiro"
        />
        <CardLink
          title="Painel Administrativo"
          icon="🛠️"
          description="Acesse funções administrativas e de apoio à gestão."
          to="/painel-administrativo"
        />
      </div>
    </div>
  );
};

export default Home;
