import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    if (newPassword !== confirmNewPassword) {
      setError("Las nuevas contraseñas no coinciden");
      return;
    }

    if (!validator.isStrongPassword(newPassword)) {
      setError("La nueva contraseña no es suficientemente segura");
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
      setSuccess("Contraseña cambiada con éxito");
      setTimeout(() => {
        handleVolver();
      }, 2000);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data.errors) {
        setError(error.response.data.errors.map((err) => err.msg).join(", "));
      } else {
        setError("Error al cambiar la contraseña");
      }
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
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
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    id="currentPassword"
                    className="form-control"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn position-absolute top-50 end-0 translate-middle-y"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="form-group mb-3 position-relative">
                  <label htmlFor="newPassword" className="form-label">
                    Nueva contraseña:
                  </label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn position-absolute top-50 end-0 translate-middle-y"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="form-group mb-3 position-relative">
                  <label htmlFor="confirmNewPassword" className="form-label">
                    Confirmar nueva contraseña:
                  </label>
                  <input
                    type={showConfirmNewPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    className="form-control"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn position-absolute top-50 end-0 translate-middle-y"
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                  >
                    {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
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
                {error && (
                  <div className="alert alert-danger mt-3">{error}</div>
                )}
                {success && (
                  <div className="alert alert-success mt-3">{success}</div>
                )}
              </form>
            </fieldset>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CambioPass;
