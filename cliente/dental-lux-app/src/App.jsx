import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CitasProvider } from "./context/CitasContext";  // Importa CitasProvider
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HomePage from "./views/HomePage";
import Login from "./views/Login";
import Registro from "./views/Registro";
import PacienteDashboard from "./views/PacienteDashboard";
import EmpleadoDashboard from "./views/EmpleadoDashboard";
import AdministradorDashboard from "./views/AdministradorDashboard";
import EditarEmpleado from "./views/EditarEmpleado";
import EditarPaciente from "./views/EditarPaciente";
import Citas from "./views/Citas";
import Icons from "./components/Icons";
import Contacto from "./views/Contacto";
import Blog from "./views/Blog";
import Error from "./views/Error";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import CrearCita from "./views/CrearCita";
import CambioPass from "./views/CambioPass";
import EditarUsuario from "./views/EditarUsuario";
import CrearEmpleado from "./views/CrearEmpleado";
import CrearPaciente from "./views/CrearPaciente";
import EditarCita from "./views/EditarCita";

function PrivateRoute({ children, roleRequired }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // O cualquier componente de loading que prefieras
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return (
      <Navigate
        to="/error"
        state={{ errorCode: "403", errorMessage: "Forbidden" }}
      />
    );
  }

  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CitasProvider> 
          <div className="App">
            <Icons /> {/* Asegura que los símbolos están disponibles */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/registro" element={<Registro />} />
              <Route
                path="/citas"
                element={
                  <PrivateRoute>
                    <Citas />
                  </PrivateRoute>
                }
              />
              <Route
                path="/crearcita"
                element={
                  <PrivateRoute>
                    <CrearCita />
                  </PrivateRoute>
                }
              />
              <Route
                path="/editarcita/:id"
                element={
                  <PrivateRoute allowedRoles={["1", "2", "3"]}>
                    <EditarCita />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cambiopass"
                element={
                  <PrivateRoute>
                    <CambioPass />
                  </PrivateRoute>
                }
              />
              <Route
                path="/editarusuario"
                element={
                  <PrivateRoute>
                    <EditarUsuario />
                  </PrivateRoute>
                }
              />
              <Route path="/crear-paciente" element={
                <PrivateRoute allowedRoles={["1", "2", "3", "4", "5"]}>
                  <CrearPaciente />
                </PrivateRoute>
              } />
              <Route
                path="/paciente/:id"
                element={
                  <PrivateRoute>
                    <PacienteDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/empleado/:id"
                element={
                  <PrivateRoute>
                    <EmpleadoDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/administrador"
                element={
                  <PrivateRoute roleRequired={"1"}>
                    <AdministradorDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/administrador/crear-empleado"
                element={
                  <PrivateRoute roleRequired={"1"}>
                    <CrearEmpleado />
                  </PrivateRoute>
                }
              />
              <Route
                path="/administrador/empleados/:id/editar"
                element={
                  <PrivateRoute roleRequired={"1"}>
                    <EditarEmpleado />
                  </PrivateRoute>
                }
              />
              <Route
                path="/administrador/pacientes/:id/editar"
                element={
                  <PrivateRoute roleRequired={"1"}>
                    <EditarPaciente />
                  </PrivateRoute>
                }
              />
              <Route path="/error" element={<Error />} />
              <Route
                path="*"
                element={
                  <Navigate
                    to="/error"
                    state={{ errorCode: "404", errorMessage: "Not Found" }}
                  />
                }
              />
            </Routes>
          </div>
        </CitasProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
