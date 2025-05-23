import React, { useState, useEffect } from "react";
import "./styles.scss";
import {
  uploadMaterial,
  listarMateriaisPorTurma,
  deletarMaterial,
  Material,
} from "../../services/Materiais";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import TurmaService from "../../services/TurmaService";

const Materiais: React.FC = () => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState<number | null>(null);
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [nomeMaterial, setNomeMaterial] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [carregandoMateriais, setCarregandoMateriais] = useState(false);
  const [carregandoTurmas, setCarregandoTurmas] = useState(false);

  useEffect(() => {
    const carregarTurmas = async () => {
      setCarregandoTurmas(true);
      try {
        const dados = await TurmaService.getAll();
        setTurmas(dados);
      } catch (error) {
        console.error("Erro ao carregar turmas:", error);
        alert("Erro ao carregar turmas.");
      } finally {
        setCarregandoTurmas(false);
      }
    };

    carregarTurmas();
  }, []);

  useEffect(() => {
    const carregarMateriais = async () => {
      if (turmaSelecionada) {
        setCarregandoMateriais(true);
        try {
          const dados = await listarMateriaisPorTurma(turmaSelecionada);
          setMateriais(dados);
        } catch (error) {
          console.error("Erro ao carregar materiais:", error);
          alert("Erro ao carregar materiais.");
        } finally {
          setCarregandoMateriais(false);
        }
      } else {
        setMateriais([]);
      }
    };

    carregarMateriais();
  }, [turmaSelecionada]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turmaSelecionada) {
      alert("Selecione uma turma.");
      return;
    }

    if (!arquivo || !nomeMaterial) {
      alert("Preencha o nome e selecione um arquivo.");
      return;
    }

    try {
      await uploadMaterial({
        nome: nomeMaterial,
        turmaId: turmaSelecionada,
        arquivo: arquivo,
      });

      alert("Material enviado com sucesso!");
      setNomeMaterial("");
      setArquivo(null);

      const dados = await listarMateriaisPorTurma(turmaSelecionada);
      setMateriais(dados);
    } catch (error) {
      console.error("Erro ao enviar material:", error);
      alert("Erro ao enviar material.");
    }
  };

  const handleExcluir = async (materialId: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este material?")) {
      return;
    }

    try {
      await deletarMaterial(materialId);
      alert("Material excluído com sucesso!");

      if (turmaSelecionada) {
        const dados = await listarMateriaisPorTurma(turmaSelecionada);
        setMateriais(dados);
      }
    } catch (error) {
      console.error("Erro ao excluir material:", error);
      alert("Erro ao excluir material.");
    }
  };

  return (
    <div className="materiais-container">
      <div className="header">
        <Link to="/painel-professor" className="back-button">
          <FaArrowLeft />
        </Link>
        <h1>Lançar Material</h1>
      </div>
      {carregandoTurmas ? (
        <p>Carregando turmas...</p>
      ) : (
        <>
          <label>Selecione a turma:</label>
          <select
            value={turmaSelecionada ?? ""}
            onChange={(e) => setTurmaSelecionada(Number(e.target.value))}
          >
            <option value="">Selecione...</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.nome}
              </option>
            ))}
          </select>
        </>
      )}

      {turmaSelecionada && (
        <>
          <form onSubmit={handleUpload} className="material-form">
            <input
              type="text"
              placeholder="Nome do material"
              value={nomeMaterial}
              onChange={(e) => setNomeMaterial(e.target.value)}
            />

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setArquivo(e.target.files ? e.target.files[0] : null)
              }
            />

            <button type="submit">Enviar</button>
          </form>

          <div className="materiais-lista">
            <h2>Materiais</h2>
            {carregandoMateriais ? (
              <p>Carregando materiais...</p>
            ) : materiais.length === 0 ? (
              <p>Nenhum material enviado para esta turma.</p>
            ) : (
              <ul>
                {materiais.map((material) => (
                  <li key={material.id}>
                    <span>{material.nome}</span>
                    <a
                      href={material.caminhoArquivo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Baixar
                    </a>
                    <button onClick={() => handleExcluir(material.id)}>
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Materiais;
