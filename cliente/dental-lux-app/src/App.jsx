import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from './views/HomePage';
import Login from './views/Login';
import Registro from './views/Registro';
import PacienteDashboard from './views/PacienteDashboard';
import EmpleadoDashboard from './views/EmpleadoDashboard';
import AdministradorDashboard from './views/AdministradorDashboard';
import EditarEmpleado from './views/EditarEmpleado';
import EditarPaciente from './views/EditarPaciente';
import Citas from './views/Citas';
import Icons from './components/Icons';
import Contacto from './views/Contacto';
import Blog from './views/Blog';
import Error from './views/Error';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Icons /> {/* Asegura que los símbolos están disponibles */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/contacto" element={<Contacto />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/registro" element={<Registro />} />
                        <Route path="/citas" element={<Citas />} />
                        <Route path="/paciente/:id" element={
                            <PrivateRoute>
                                <PacienteDashboard />
                            </PrivateRoute>
                        } />
                        <Route path="/empleado/:id" element={
                            <PrivateRoute>
                                <EmpleadoDashboard />
                            </PrivateRoute>
                        } />
                        <Route path="/administrador" element={
                            <PrivateRoute roleRequired={"1"}>
                                <AdministradorDashboard />
                            </PrivateRoute>
                        } />
                        <Route path="/administrador/empleados/:id/editar" element={
                            <PrivateRoute roleRequired={"1"}>
                                <EditarEmpleado />
                            </PrivateRoute>
                        } />
                        <Route path="/administrador/pacientes/:id/editar" element={
                            <PrivateRoute roleRequired={"1"}>
                                <EditarPaciente />
                            </PrivateRoute>
                        } />
                        <Route path="/error" element={<Error />} />
                        <Route path="*" element={<Navigate to="/error" state={{ errorCode: '404', errorMessage: 'Not Found' }} />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

function PrivateRoute({ children, roleRequired }) {
    const { user } = useContext(AuthContext);
  
    if (!user) {
      return <Navigate to="/login" />;
    }
  
    if (roleRequired && user.role !== roleRequired) {
      return <Navigate to="/error" state={{ errorCode: '403', errorMessage: 'Forbidden' }} />;
    }
  
    return children;
  }
  

export default App;
