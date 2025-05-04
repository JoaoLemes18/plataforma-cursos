import { FaUser } from "react-icons/fa";
import "./styles.scss";

const UserInfo = () => {
  return (
    <div className="user-info">
      <div className="user-icon">
        <FaUser size={20} color="#f05623" />
      </div>
      <div className="user-details">
        <p className="user-name">
          <span style={{ color: "#000" }}>Olá,</span>{" "}
          <span style={{ color: "#f05623" }}>João</span>
        </p>
        <p className="user-code">
          <span style={{ color: "#000" }}> Seu nível de acesso é:</span>{" "}
          <span style={{ color: "#f05623" }}>Master</span>
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
