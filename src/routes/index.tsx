import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cursos from "../pages/Cursos";
import Alunos from "../pages/Alunos";
import Professores from "../pages/Professores";
import Matricula from "../pages/Matricula";

import ListarProfessores from "../pages/ListarProfessores";
import ListarAlunos from "../pages/ListarAlunos";
import ListarCursos from "../pages/ListarCursos";
import ListarMatriculas from "../pages/ListarMatriculas";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/matricula" element={<Matricula />} />
        <Route path="/listar-professores" element={<ListarProfessores />} />
        <Route path="/listar-alunos" element={<ListarAlunos />} />
        <Route path="/listar-cursos" element={<ListarCursos />} />
        <Route path="listar-matriculas" element={<ListarMatriculas />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
