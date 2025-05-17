import React, { createContext, useContext, useState, useEffect } from "react";

interface Usuario {
  nome?: string;
  tipoUsuario?: number;
}

interface UserContextData {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
}

const UserContext = createContext<UserContextData>({
  usuario: null,
  setUsuario: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [usuario, setUsuarioState] = useState<Usuario | null>(null);

  useEffect(() => {
    const usuarioStorage = sessionStorage.getItem("usuarioLogado");
    if (usuarioStorage) {
      setUsuarioState(JSON.parse(usuarioStorage));
    }
  }, []);

  const setUsuario = (usuario: Usuario | null) => {
    setUsuarioState(usuario);
    if (usuario) {
      sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    } else {
      sessionStorage.removeItem("usuarioLogado");
    }
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
