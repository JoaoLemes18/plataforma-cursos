import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import CryptoJS from "crypto-js"; // ✅ Importa o crypto-js

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

const CHAVE_CRIPTO = "chave-ofusca-123"; // 🔐 Chave fixa para ofuscação (não é segura, mas suficiente)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [usuario, setUsuarioState] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const criptografado = sessionStorage.getItem("usuarioLogado");
    if (criptografado) {
      try {
        const bytes = CryptoJS.AES.decrypt(criptografado, CHAVE_CRIPTO);
        const dados = bytes.toString(CryptoJS.enc.Utf8);
        const usuario: Usuario = JSON.parse(dados);
        setUsuarioState(usuario);
      } catch (err) {
        console.error("Erro ao descriptografar o usuário:", err);
        sessionStorage.removeItem("usuarioLogado");
      }
    }
    setLoading(false);
  }, []);

  const setUsuario = (usuario: Usuario | null) => {
    if (usuario) {
      const dados = JSON.stringify(usuario);
      const criptografado = CryptoJS.AES.encrypt(
        dados,
        CHAVE_CRIPTO
      ).toString();
      sessionStorage.setItem("usuarioLogado", criptografado);
      setUsuarioState(usuario);
    } else {
      sessionStorage.removeItem("usuarioLogado");
      setUsuarioState(null);
    }
  };

  const value = useMemo(
    () => ({ usuario, setUsuario, loading }),
    [usuario, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
