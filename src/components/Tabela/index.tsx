import React from "react";
import "./styles.scss";

interface Coluna {
  title: string; // Nome do cabeçalho
  field: string; // Nome do campo no objeto de dados
  render?: (row: any) => React.ReactNode; // Função para personalizar a célula
  className?: string; // Classe CSS personalizada para a célula
}

interface TabelaProps {
  colunas: Coluna[];
  dados: any[];
}

const Tabela: React.FC<TabelaProps> = ({ colunas, dados }) => {
  const renderCelula = (coluna: Coluna, row: any) => {
    return coluna.render ? coluna.render(row) : row[coluna.field];
  };

  return (
    <div className="tabela-container">
      <table className="tabela">
        <thead>
          <tr>
            {colunas.map((coluna, index) => (
              <th key={index} className={coluna.className || ""}>
                {coluna.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.length > 0 ? (
            dados.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {colunas.map((coluna, colIndex) => (
                  <td key={colIndex} className={coluna.className || ""}>
                    {renderCelula(coluna, item)}
                  </td>
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
