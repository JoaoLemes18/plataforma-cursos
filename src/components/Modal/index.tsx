import React from "react";
import "./style.scss";

interface ModalProps {
  fechar: () => void;
  titulo: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ fechar, titulo, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{titulo}</h3>
        {children}
        <div className="modal-actions">
          <button onClick={fechar} className="cancel-button">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
