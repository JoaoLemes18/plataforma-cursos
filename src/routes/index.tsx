import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";

import Home from "../pages/Home";
import Cursos from "../pages/Cursos";
import AlunosPorCurso from "../pages/AlunosCurso";
import Turmas from "../pages/Turmas";
import Matricula from "../pages/Matricula";
import PainelAluno from "../pages/Painel-Aluno";
import PainelCoordenador from "../pages/Painel-Coordenador";
import PainelProfessor from "../pages/Painel-Professor";
import PainelFinanceiro from "../pages/Painel-Financeiro";

import ListarProfessores from "../pages/ListarProfessores";
import ListarAlunos from "../pages/ListarAlunos";
import ListarCursos from "../pages/ListarCursos";
import ListarMatriculas from "../pages/ListarMatriculas";

import AcessoNegado from "../pages/AcessoNegado";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route path="/cursos" element={<Cursos />} />
        <Route path="/turmas" element={<Turmas />} />
        <Route path="/matricula" element={<Matricula />} />
        <Route path="/listar-professores" element={<ListarProfessores />} />
        <Route path="/listar-alunos" element={<ListarAlunos />} />
        <Route path="/listar-cursos" element={<ListarCursos />} />
        <Route path="/listar-matriculas" element={<ListarMatriculas />} />
        <Route path="/alunos-curso" element={<AlunosPorCurso />} />

        <Route path="/painel-aluno" element={<PainelAluno />} />

        <Route path="/painel-coordenador" element={<PainelCoordenador />} />

        <Route path="/painel-professor" element={<PainelProfessor />} />
        <Route path="/painel-financeiro" element={<PainelFinanceiro />} />

        <Route path="/acesso-negado" element={<AcessoNegado />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
