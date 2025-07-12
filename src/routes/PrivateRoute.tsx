import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface PrivateRouteProps {
  children: JSX.Element;
  tiposPermitidos: number[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  tiposPermitidos,
}) => {
  const { usuario, loading } = useUser();

  if (loading) {
    // Pode personalizar esse loader com um spinner ou tela de splash
    return <div>Carregando...</div>;
  }

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (!tiposPermitidos.includes(usuario.tipoUsuario)) {
    return <Navigate to="/acesso-negado" />;
  }

  return children;
};

export default PrivateRoute;
