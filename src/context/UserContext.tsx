import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

interface Usuario {
  id: number;
  nome: string;
  tipoUsuario: number;
  turmaId: number;
}

interface UserContextData {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextData>({
  usuario: null,
  setUsuario: () => {},
  loading: true,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [usuario, setUsuarioState] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioStorage = sessionStorage.getItem("usuarioLogado");
    if (usuarioStorage) {
      setUsuarioState(JSON.parse(usuarioStorage));
    }
    setLoading(false); // liberação de carregamento
  }, []);

  const setUsuario = (usuario: Usuario | null) => {
    setUsuarioState(usuario);
    if (usuario) {
      sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    } else {
      sessionStorage.removeItem("usuarioLogado");
    }
  };

  const value = useMemo(
    () => ({ usuario, setUsuario, loading }),
    [usuario, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
