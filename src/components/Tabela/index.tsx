import React from "react";
import "./styles.scss";

interface Coluna {
  title: string; // Nome do cabeçalho
  field?: string; // Nome do campo no objeto de dados (opcional para ações)
  render?: (row: any) => React.ReactNode; // Função para personalizar a célula
  className?: string; // Classe CSS personalizada para a célula
}

interface TabelaProps {
  colunas: Coluna[];
  dados: any[];
  onEdit?: (row: any) => void; // Função para editar
  onDelete?: (row: any) => void; // Função para excluir
}

const Tabela: React.FC<TabelaProps> = ({
  colunas,
  dados,
  onEdit,
  onDelete,
}) => {
  const renderCelula = (coluna: Coluna, row: any) => {
    return coluna.render ? coluna.render(row) : row[coluna.field || ""];
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
            {(onEdit || onDelete) && <th>Ações</th>}
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
                {(onEdit || onDelete) && (
                  <td>
                    {onEdit && (
                      <button
                        className="btn-editar"
                        onClick={() => onEdit(item)}
                      >
                        Editar
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="btn-excluir"
                        onClick={() => onDelete(item)}
                      >
                        Excluir
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={colunas.length + 1} className="no-data">
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
