
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";  
import Cursos from "../pages/Cursos";  
import Alunos from "../pages/Alunos";  
import Professores from "../pages/Professores";  

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/professores" element={<Professores />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
