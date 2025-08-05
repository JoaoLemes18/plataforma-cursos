import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { TipoUsuario } from "../types";

// Páginas públicas
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AcessoNegado from "../pages/AcessoNegado";

// Páginas protegidas
import Cursos from "../pages/Cursos";
import Turmas from "../pages/Turmas";
import Matricula from "../pages/Matricula";
import Materiais from "../pages/Materiais";
import Comunicado from "../pages/Comunicado";
import ListarProfessores from "../pages/ListarProfessores";
import ListarAlunos from "../pages/ListarAlunos";
import ListarCursos from "../pages/ListarCursos";
import ListarMatriculas from "../pages/ListarMatriculas";
import AlunosPorCurso from "../pages/AlunosCurso";
import AlunoMateriais from "../pages/AlunoMateriais";
import ContratoAluno from "../pages/Contrato";
import AlunoBoletos from "../pages/AlunoBoleto";

// Páginas por tipo de usuário
import PainelAluno from "../pages/Painel-Aluno";
import PainelCoordenador from "../pages/Painel-Coordenador";
import PainelProfessor from "../pages/Painel-Professor";
import PainelFinanceiro from "../pages/Painel-Financeiro";
import ListarTurmas from "../pages/ListarTurmas";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Cadastro />} />
      <Route path="/cadastrar" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/acesso-negado" element={<AcessoNegado />} />

      {/* Painéis por tipo */}
      <Route
        path="/painel-aluno"
        element={
          <PrivateRoute tiposPermitidos={[TipoUsuario.Aluno]}>
            <PainelAluno />
          </PrivateRoute>
        }
      />
      <Route
        path="/painel-coordenador"
        element={
          <PrivateRoute tiposPermitidos={[TipoUsuario.Coordenador]}>
            <PainelCoordenador />
          </PrivateRoute>
        }
      />
      <Route
        path="/painel-professor"
        element={
          <PrivateRoute tiposPermitidos={[TipoUsuario.Professor]}>
            <PainelProfessor />
          </PrivateRoute>
        }
      />
      <Route
        path="/painel-financeiro"
        element={
          <PrivateRoute
            tiposPermitidos={[TipoUsuario.Administrativo, TipoUsuario.Master]}
          >
            <PainelFinanceiro />
          </PrivateRoute>
        }
      />

      {/* Rotas protegidas conforme permissões atualizadas */}
      <Route
        path="/cursos"
        element={
          <PrivateRoute
            tiposPermitidos={[
              TipoUsuario.Coordenador,
              TipoUsuario.Administrativo,
              TipoUsuario.Master,
            ]}
          >
            <Cursos />
          </PrivateRoute>
        }
      />
      <Route
        path="/turmas"
        element={
          <PrivateRoute
            tiposPermitidos={[
              TipoUsuario.Coordenador,
              TipoUsuario.Administrativo,
              TipoUsuario.Master,
            ]}
          >
            <Turmas />
          </PrivateRoute>
        }
      />
      <Route
        path="/matricula"
        element={
          <PrivateRoute
            tiposPermitidos={[
              TipoUsuario.Coordenador,
              TipoUsuario.Administrativo,
              TipoUsuario.Master,
            ]}
          >
            <Matricula />
          </PrivateRoute>
        }
      />
      <Route
        path="/comunicado"
        element={
          <PrivateRoute
            tiposPermitidos={[
              TipoUsuario.Coordenador,
              TipoUsuario.Administrativo,
              TipoUsuario.Master,
            ]}
          >
            <Comunicado />
          </PrivateRoute>
        }
      />
      <Route
        path="/listar-professores"
        element={
          <PrivateRoute
            tiposPermitidos={[
              TipoUsuario.Coordenador,
              TipoUsuario.Administrativo,
              TipoUsuario.Master,
            ]}
          >
            <ListarProfessores />
          </PrivateRoute>
        }
      />
      <Route
        path="/listar-alunos"
        element={
          <PrivateRoute
            tiposPermitidos={[
              TipoUsuario.Coordenador,
              TipoUsuario.Administrativo,
              TipoUsuario.Master,
            ]}
          >
            <ListarAlunos />
          </PrivateRoute>
        }
      />
      <Route
        path="/listar-cursos"
        element={
          <PrivateRoute
            tiposPermitidos={[
              TipoUsuario.Coordenador,
              TipoUsuario.Administrativo,
              TipoUsuario.Master,
            ]}
          >
            <ListarCursos />
          </PrivateRoute>
        }
      />
      <Route
        path="/listar-matriculas"
        element={
          <PrivateRoute
            tiposPermitidos={[
              TipoUsuario.Coordenador,
              TipoUsuario.Administrativo,
              TipoUsuario.Master,
            ]}
          >
            <ListarMatriculas />
          </PrivateRoute>
        }
      />
      <Route
        path="/alunos-curso"
        element={
          <PrivateRoute
            tiposPermitidos={[
              TipoUsuario.Coordenador,
              TipoUsuario.Administrativo,
              TipoUsuario.Master,
            ]}
          >
            <AlunosPorCurso />
          </PrivateRoute>
        }
      />
      <Route
        path="/materiais"
        element={
          <PrivateRoute
            tiposPermitidos={[TipoUsuario.Professor, TipoUsuario.Master]}
          >
            <Materiais />
          </PrivateRoute>
        }
      />
      <Route
        path="/listar-turmas"
        element={
          <PrivateRoute
            tiposPermitidos={[TipoUsuario.Professor, TipoUsuario.Master]}
          >
            <ListarTurmas />
          </PrivateRoute>
        }
      />
      <Route
        path="/alunos-materiais"
        element={
          <PrivateRoute
            tiposPermitidos={[TipoUsuario.Aluno, TipoUsuario.Master]}
          >
            <AlunoMateriais />
          </PrivateRoute>
        }
      />
      <Route
        path="/alunos-contrato"
        element={
          <PrivateRoute
            tiposPermitidos={[TipoUsuario.Aluno, TipoUsuario.Master]}
          >
            <ContratoAluno />
          </PrivateRoute>
        }
      />
      <Route
        path="/aluno-boletos"
        element={
          <PrivateRoute
            tiposPermitidos={[TipoUsuario.Aluno, TipoUsuario.Master]}
          >
            <AlunoBoletos />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
