import React from "react";
import CardLink from "../../components/Card";
import UserInfo from "../../components/UserInfo";
import "./styles.scss";

const cards = [
  {
    title: "Painel do Aluno",
    icon: "🎓",
    description: "Acesse as informações acadêmicas e desempenho do aluno.",
    to: "/painel-aluno",
  },
  {
    title: "Painel do Professor",
    icon: "🧑‍🏫",
    description: "Acesse as turmas, notas lançadas e informações do professor.",
    to: "/painel-professor",
  },
  {
    title: "Painel do Coordenador",
    icon: "🗂️",
    description: "Gerencie cursos, turmas, professores e desempenho geral.",
    to: "/painel-coordenador",
  },
  {
    title: "Painel do Financeiro",
    icon: "💰",
    description: "Acompanhe dados financeiros, mensalidades e cobranças.",
    to: "/painel-financeiro",
  },
  {
    title: "Painel Administrativo",
    icon: "🛠️",
    description: "Acesse funções administrativas e de apoio à gestão.",
    to: "/painel-administrativo",
  },
];

const DashboardCards: React.FC = () => {
  console.count("Render do DashboardCards");
  return (
    <div className="card-container">
      {cards.map(({ title, icon, description, to }) => (
        <CardLink
          key={to}
          title={title}
          icon={icon}
          description={description}
          to={to}
        />
      ))}
    </div>
  );
};

const Home: React.FC = () => {
  console.count("Render do Home");
  return (
    <div className="home-container">
      <div className="user-info-container">
        <UserInfo />
      </div>

      <h2>Bem-vindo à Gestão Acadêmica</h2>
      <p>Escolha uma opção abaixo:</p>

      <DashboardCards />
    </div>
  );
};

export default Home;
