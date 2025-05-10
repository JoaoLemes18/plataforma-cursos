import React from "react";
import "./styles.scss";
import UserInfo from "../../components/UserInfo";

const PainelFinanceiro: React.FC = () => {
  return (
    <div className="home-container">
      <div className="user-info-container">
        <UserInfo />
      </div>
      <h2>Bem-vindo ao Painel do Aluno</h2>
      <p>Escolha uma opção abaixo:</p>
    </div>
  );
};

export default PainelFinanceiro;
