import React from "react";
import CardLink from "../../components/Card";
import UserInfo from "../../components/UserInfo";
import "./styles.scss";

const PainelAluno: React.FC = () => {
  return (
    <div className="home-container">
      <div className="user-info-container">
        <UserInfo />
      </div>
      <h2>Bem-vindo ao Painel do Aluno</h2>
      <p>Escolha uma opção abaixo:</p>

      <div className="card-container">
        <CardLink
          title="Material de Apoio"
          icon="📘"
          description="Acesse materiais de estudo disponibilizados pelos professores."
          to="/alunos-materiais"
        />
        <CardLink
          title="Contrato"
          icon="📄"
          description="Visualize o contrato da sua matrícula."
          to="/aluno/contrato"
        />
        <CardLink
          title="Boletos"
          icon="💳"
          description="Veja e baixe seus boletos de pagamento."
          to="/aluno/boletos"
        />
        <CardLink
          title="Meus Cursos"
          icon="🎓"
          description="Veja os cursos em que você está matriculado."
          to="/aluno/cursos"
        />
      </div>
    </div>
  );
};

export default PainelAluno;
