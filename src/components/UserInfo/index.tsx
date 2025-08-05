import { FaUser } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import "./styles.scss";

const tipoMap: { [key: number]: string } = {
  1: "Aluno",
  2: "Professor",
  3: "Coordenador",
  4: "Administrativo",
  5: "Financeiro",
  6: "Master",
};

const UserInfo = () => {
  const { usuario, setUsuario } = useUser();

  const handleLogout = () => {
    setUsuario(null);
    sessionStorage.removeItem("comunicadoVisualizado"); 
    sessionStorage.removeItem("tokenJWT");

    window.location.href = "/login"; 
  };

  return (
    <div className="user-info">
      <div className="user-icon">
        <FaUser size={20} color="#f05623" />
      </div>
      <div className="user-details">
        <p className="user-name">
          <span style={{ color: "#000" }}>Olá,</span>{" "}
          <span style={{ color: "#f05623" }}>{usuario?.nome || "Usuário"}</span>
        </p>
        <p className="user-code">
          <span style={{ color: "#000" }}>Seu nível de acesso é:</span>{" "}
          <span style={{ color: "#f05623" }}>
            {usuario
              ? tipoMap[usuario.tipoUsuario || 0] ||
                `Tipo ${usuario.tipoUsuario}`
              : "Desconhecido"}
          </span>
        </p>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
};

export default UserInfo;
