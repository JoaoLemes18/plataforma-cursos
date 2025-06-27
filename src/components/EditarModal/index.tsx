import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Pessoa } from "../../types";

interface Props {
  pessoa: Pessoa | null;
  onClose: () => void;
  onSave: (pessoa: Pessoa) => void;
}

const ModalEditar: React.FC<Props> = ({ pessoa, onClose, onSave }) => {
  const [form, setForm] = useState<Pessoa>({} as Pessoa);

  useEffect(() => {
    if (pessoa) setForm(pessoa);
  }, [pessoa]);

  if (!pessoa) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Editar Pessoa</h3>

        <input
          type="text"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          placeholder="Nome"
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="text"
          value={form.telefone}
          onChange={(e) => setForm({ ...form, telefone: e.target.value })}
          placeholder="Telefone"
        />

        <div className="modal-actions">
          <button onClick={() => onSave(form)}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditar;
