import React from "react";
import AppRoutes from "./routes";
import "./styles/main.scss";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <AppRoutes />
    </div>
  );
};

export default App;
