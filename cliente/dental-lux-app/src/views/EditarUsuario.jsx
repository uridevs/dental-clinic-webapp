import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../layout/Layout";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import validator from "validator";

const EditarUsuario = () => {
  const { user } = useContext(AuthContext);
  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    dni: "",
    id_categoria_profesional: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarioData = async () => {
      try {
        const { data } = await api.get(
          user.role === "paciente"
            ? `/pacientes/${user.idEspecifico}`
            : `/empleados/${user.idEspecifico}`
        );
        setDatos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching usuario data:", error);
        toast.error("Error al cargar la información del usuario", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
        setLoading(false);
      }
    };

    fetchUsuarioData();
  }, [user.idEspecifico, user.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const validateFields = () => {
    if (!validator.isEmail(datos.email)) {
      toast.error("Correo electrónico inválido", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      return false;
    }
    if (validator.isEmpty(datos.nombre)) {
      toast.error("El nombre no puede estar vacío", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      return false;
    }
    if (validator.isEmpty(datos.apellidos)) {
      toast.error("Los apellidos no pueden estar vacíos", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      return false;
    }
    if (validator.isEmpty(datos.telefono)) {
      toast.error("El teléfono no puede estar vacío", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    try {
      await api.put(
        `/${user.role === "paciente" ? "pacientes" : "empleados"}/${
          user.idEspecifico
        }`,
        datos
      );
      toast.success("Información del usuario actualizada correctamente", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      setTimeout(() => {
        navigate(user.role === "paciente" ? `/paciente/${user.idEspecifico}` : `/empleado/${user.idEspecifico}`);
      }, 2500);
    } catch (error) {
      console.error("Error updating usuario data:", error);
      toast.error("Error al actualizar la información del usuario", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  };

  const handleVolver = () => {
    navigate(user.role === "paciente" ? `/paciente/${user.idEspecifico}` : `/empleado/${user.idEspecifico}`);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
      <div className="container mt-5">
        <ToastContainer />
        <div className="text-center">
          <div className="d-flex justify-content-center gap-2 mb-4">
            <button className="btn btn-secondary" onClick={handleVolver}>
              Volver
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <fieldset className="card p-4">
              <legend className="card-title text-center">
                Editar Usuario
              </legend>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="dni" className="form-label">
                    DNI:
                  </label>
                  <input
                    type="text"
                    name="dni"
                    id="dni"
                    className="form-control"
                    value={datos.dni}
                    disabled
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="form-control"
                    value={datos.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="apellidos" className="form-label">
                    Apellidos:
                  </label>
                  <input
                    type="text"
                    name="apellidos"
                    id="apellidos"
                    className="form-control"
                    value={datos.apellidos}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    value={datos.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono:
                  </label>
                  <input
                    type="text"
                    name="telefono"
                    id="telefono"
                    className="form-control"
                    value={datos.telefono}
                    onChange={handleChange}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">
                  Guardar Cambios
                </button>
              </form>
            </fieldset>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditarUsuario;
