import React from "react";
import "./styles.scss";

interface Coluna {
  title: string;
  field: string;
}

interface TabelaProps {
  colunas: Coluna[];
  dados: any[];
}

const Tabela: React.FC<TabelaProps> = ({ colunas, dados }) => {
  return (
    <div className="tabela-container">
      <table className="tabela">
        <thead>
          <tr>
            {colunas.map((coluna, index) => (
              <th key={index}>{coluna.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.length > 0 ? (
            dados.map((item, index) => (
              <tr key={index}>
                {colunas.map((coluna, colIndex) => (
                  <td key={colIndex}>{item[coluna.field]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={colunas.length} className="no-data">
                Nenhum dado disponível
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tabela;
