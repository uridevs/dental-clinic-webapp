import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../layout/Layout";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import validator from "validator";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CambioPass = () => {
  const { user } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const navigate = useNavigate();

  const handleVolver = () => {
    if (user.role === "paciente") {
      navigate(`/paciente/${user.idEspecifico}`);
    } else if (user.role === "1") {
      navigate("/Administrador");
    } else {
      navigate(`/empleado/${user.idEspecifico}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentPassword === newPassword) {
      toast.error("La nueva contraseña no puede ser igual a la actual", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Las nuevas contraseñas no coinciden", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      return;
    }

    if (!validator.isStrongPassword(newPassword)) {
      toast.error("La nueva contraseña no es suficientemente segura", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      return;
    }

    setLoading(true);
    try {
      await api.put(
        "/usuarios/cambiar-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      toast.success("Contraseña cambiada con éxito", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      setTimeout(() => {
        handleVolver();
      }, 2500);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        toast.error("Contraseña actual incorrecta", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
      } else if (error.response && error.response.data.errors) {
        toast.error(error.response.data.errors.map((err) => err.msg).join(", "), {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
      } else {
        toast.error("Error al cambiar la contraseña", {
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
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <ToastContainer />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <fieldset className="card p-4">
              <legend className="card-title text-center">
                Cambiar Contraseña
              </legend>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3 position-relative">
                  <label htmlFor="currentPassword" className="form-label">
                    Contraseña actual:
                  </label>
                  <div className="input-group">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      id="currentPassword"
                      className="form-control"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3 position-relative">
                  <label htmlFor="newPassword" className="form-label">
                    Nueva contraseña:
                  </label>
                  <div className="input-group">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      id="newPassword"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3 position-relative">
                  <label htmlFor="confirmNewPassword" className="form-label">
                    Confirmar nueva contraseña:
                  </label>
                  <div className="input-group">
                    <input
                      type={showConfirmNewPassword ? "text" : "password"}
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      className="form-control"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                      >
                        {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Cambiando..." : "Cambiar Contraseña"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={handleVolver}
                >
                  Volver
                </button>
              </form>
            </fieldset>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CambioPass;
