import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from './views/HomePage';
import Login from './views/Login';
import Registro from './views/Registro';
import PacienteDashboard from './views/PacienteDashboard';
import EmpleadoDashboard from './views/EmpleadoDashboard';
import Icons from './components/Icons';
import Contacto from './views/Contacto';
import Blog from './views/Blog';

function App() {
    return (
       
        <AuthProvider> 
            <Router>
                <div className="App">
                    <Icons /> {/* Asegura que los símbolos están disponibles */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/Contacto" element={<Contacto />} />
                        <Route path="/Blog" element={<Blog />} />
                        <Route path="/registro" element={<Registro />} />
                        {/* <Route path="/registro" element={<Registro />} /> */}
                        <Route path="/paciente" element={<PacienteDashboard />} />
                        <Route path="/empleado" element={<EmpleadoDashboard />} />
                        {/* <Route path="/paciente/dashboard" element={<PrivateRoute><PacienteDashboard /></PrivateRoute>} />
                        <Route path="/empleado/dashboard" element={<PrivateRoute><EmpleadoDashboard /></PrivateRoute>} /> */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

// Implementación correcta de PrivateRoute para React Router v6
// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
    const { authInfo } = useAuth();
    return authInfo.isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default App;


