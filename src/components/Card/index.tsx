import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

interface CardLinkProps {
  title: string;
  icon: string;
  description: string;
  to: string;
  className?: string; // className opcional
}

const CardLink: React.FC<CardLinkProps> = ({
  title,
  icon,
  description,
  to,
  className = "", // Garantir que tenha um valor padrão vazio
}) => {
  return (
    <Link to={to} className={`card-link ${className}`}>
      {" "}
      {/* Aplica a className */}
      <div className="card-content">
        <span className="card-icon">{icon}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default CardLink;
