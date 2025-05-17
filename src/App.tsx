import React from "react";
import AppRoutes from "./routes";
import { UserProvider } from "./Contexts/UserContext";
import "./styles/main.scss";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </div>
  );
};

export default App;
