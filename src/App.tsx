import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import ComunicadoPopup from "./components/ComunicadoPopup";

import "react-toastify/dist/ReactToastify.css";
import "./styles/main.scss";

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <ComunicadoPopup />
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </UserProvider>
    </Router>
  );
};

export default App;
