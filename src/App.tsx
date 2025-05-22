import React from "react";
import AppRoutes from "./routes";
import { UserProvider } from "./Contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/main.scss";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <UserProvider>
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
    </div>
  );
};

export default App;
